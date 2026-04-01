import type { APIRoute } from "astro";
import { isProductionDeployment, SITEMAP_INDEX_URL } from "../lib/seo";

export const GET: APIRoute = () => {
  const body = isProductionDeployment()
    ? [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${SITEMAP_INDEX_URL}`].join("\n")
    : [`User-agent: *`, `Disallow: /`].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
