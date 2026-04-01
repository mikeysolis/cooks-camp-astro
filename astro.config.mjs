// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [sitemap()],
  redirects: {
    "/Cones.html": "/cottages/cones",
    "/big_guilda.html": "/cottages/big-guilda",
    "/camera.html": "/cottages/camera",
    "/captain.html": "/cottages/the-captain",
    "/dunes.html": "/cottages/dunes",
    "/gallery_aerial.html": "/legacy/sky-wildlife",
    "/gallery_beach.html": "/legacy/beach",
    "/gallery_camps.html": "/legacy/camps",
    "/gallery_historic.html": "/legacy/historic",
    "/gallery_wild.html": "/legacy/sky-wildlife",
    "/index.html": "/",
    "/large.html": "/cottages",
    "/little_guilda.html": "/cottages/little-guilda",
    "/marconi.html": "/cottages/marconi",
    "/medium.html": "/cottages",
    "/new_cabin.html": "/cottages/new-cabin",
    "/oversea.html": "/cottages/oversea",
    "/pines.html": "/cottages/pines",
    "/pretty_home.html": "/cottages/pretty-home",
    "/robots.txt.html": "/robots.txt",
    "/sands.html": "/cottages/sands",
    "/sandy_scott.html": "/cottages/sandy-scot",
    "/small.html": "/cottages",
    "/summer_salt.html": "/cottages/summer-salt",
    "/thumbnail-gallery.css.html": "/legacy",
  },
  site: "https://www.cooksbytheocean.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
