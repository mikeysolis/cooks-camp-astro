import { createHmac, timingSafeEqual } from "node:crypto";

const fallbackSecret = "cookscamps-development-contact-secret";

export const contactRateLimitWindowMs = 15 * 60 * 1000;
export const contactRateLimitMaxSubmissions = 5;
export const minimumSubmitDelayMs = 3 * 1000;
export const maximumFormAgeMs = 12 * 60 * 60 * 1000;

export function getContactFormSecret() {
  return (
    import.meta.env.CONTACT_FORM_SECRET ||
    import.meta.env.RESEND_API_KEY ||
    fallbackSecret
  );
}

export function signContactFormTimestamp(timestamp: string) {
  return createHmac("sha256", getContactFormSecret()).update(timestamp).digest("hex");
}

export function isValidContactFormToken(timestamp: string, token: string) {
  const expected = signContactFormTimestamp(timestamp);

  if (expected.length !== token.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
}
