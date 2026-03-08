import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";
import {
  contactRateLimitMaxSubmissions,
  contactRateLimitWindowMs,
  isValidContactFormToken,
  maximumFormAgeMs,
  minimumSubmitDelayMs,
} from "../lib/contact-form";

const submissionWindowByIp = new Map<string, number[]>();

const requestDatesSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  cottage: z.string().trim().max(80).optional(),
  preferredDates: z
    .string()
    .trim()
    .min(4, "Please include your preferred dates.")
    .max(120),
  partySize: z.string().trim().max(20).optional(),
  message: z.string().trim().max(2000).optional(),
  website: z.string().optional(),
  formStartedAt: z.string(),
  formToken: z.string(),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentSubmissions = (submissionWindowByIp.get(ip) ?? []).filter(
    (submittedAt) => now - submittedAt < contactRateLimitWindowMs,
  );

  if (recentSubmissions.length >= contactRateLimitMaxSubmissions) {
    submissionWindowByIp.set(ip, recentSubmissions);
    return true;
  }

  recentSubmissions.push(now);
  submissionWindowByIp.set(ip, recentSubmissions);
  return false;
}

function getSenderConfig() {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.CONTACT_FROM_EMAIL;
  const to = import.meta.env.CONTACT_TO_EMAIL || "cooksbytheocean@gmail.com";

  if (!apiKey || !from) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "The contact form is not configured yet.",
    });
  }

  return { apiKey, from, to };
}

export const server = {
  requestDates: defineAction({
    accept: "form",
    input: requestDatesSchema,
    handler: async (input, context) => {
      if (input.website?.trim()) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "The submission could not be accepted.",
        });
      }

      if (!isValidContactFormToken(input.formStartedAt, input.formToken)) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "The form session expired. Please try again.",
        });
      }

      const formStartedAt = Number(input.formStartedAt);

      if (!Number.isFinite(formStartedAt)) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "The form session was invalid. Please try again.",
        });
      }

      const ageMs = Date.now() - formStartedAt;

      if (ageMs < minimumSubmitDelayMs) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Please take another moment to review your request before sending it.",
        });
      }

      if (ageMs > maximumFormAgeMs) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "The form session expired. Please try again.",
        });
      }

      const ipAddress =
        context.clientAddress ||
        context.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown";

      if (isRateLimited(ipAddress)) {
        throw new ActionError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests were sent from this address. Please wait a few minutes and try again.",
        });
      }

      const { apiKey, from, to } = getSenderConfig();
      const resend = new Resend(apiKey);
      const subjectParts = ["Cook's by the Ocean request"];

      if (input.cottage) {
        subjectParts.push(`for ${input.cottage}`);
      }

      const preferredDates = escapeHtml(input.preferredDates);
      const message = escapeHtml(input.message || "No additional notes provided.");
      const partySize = escapeHtml(input.partySize || "Not provided");
      const cottage = escapeHtml(input.cottage || "No cottage selected");
      const name = escapeHtml(input.name);
      const email = escapeHtml(input.email);

      const { error } = await resend.emails.send({
        from,
        to,
        reply_to: input.email,
        subject: subjectParts.join(" "),
        text: [
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          `Preferred dates: ${input.preferredDates}`,
          `Cottage: ${input.cottage || "No cottage selected"}`,
          `Party size: ${input.partySize || "Not provided"}`,
          "",
          input.message || "No additional notes provided.",
        ].join("\n"),
        html: `
          <h1>Cook's by the Ocean request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Preferred dates:</strong> ${preferredDates}</p>
          <p><strong>Cottage:</strong> ${cottage}</p>
          <p><strong>Party size:</strong> ${partySize}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replaceAll("\n", "<br />")}</p>
        `,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_GATEWAY",
          message: "The request could not be sent right now. Please try again or email Cook's directly.",
        });
      }

      return {
        success: true,
        message: "Thanks. Your request has been sent, and Cook's will follow up by email.",
      };
    },
  }),
};
