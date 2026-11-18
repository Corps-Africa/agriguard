# AgriGuard Solutions website

Static website for AgriGuard Solutions (grain aggregation and guinea fowl production), built with
[Astro](https://astro.build) and TypeScript. It outputs plain HTML/CSS with a little JavaScript,
so it loads fast on mobile data and can be hosted for free.

## Pages

| Page | File |
| --- | --- |
| Home | `src/pages/index.astro` |
| About Us | `src/pages/about.astro` |
| Products & Services | `src/pages/products.astro` |
| Contact | `src/pages/contact.astro` |
| 404 | `src/pages/404.astro` |

## Commands

```bash
npm install       # once
npm run dev       # local dev server at http://localhost:4321
npm run build     # type-check + build to dist/, then list remaining placeholders
npm run preview   # serve the built site
```

## Editing content

All text, products, contact details and social links are in **`src/data/site.ts`**.
Layout code doesn't need to change to update content.

- **Placeholders:** text the client still has to confirm is wrapped in `tbc("...")`. In preview
  mode it shows with a gold highlight, and every `npm run build` prints the full list of
  placeholders still on the site.
- **Photos:** put images in `public/images/` and set `photo.src` (and `alt`) on the product line
  or founder in `site.ts`. Until then, a striped "Photo: …" box shows.
- **WhatsApp:** set `site.contact.whatsapp` to the number in international format, digits only
  (e.g. `233201234567`). Every WhatsApp button uses it.
- **Contact form:** with `site.formEndpoint` empty, the form opens WhatsApp with the enquiry
  pre-filled. To receive enquiries by email, create a free form at [Formspree](https://formspree.io)
  and paste its endpoint URL into `formEndpoint`.
- **Map:** in Google Maps, Share → Embed a map, copy the `src` URL into `site.contact.mapEmbedUrl`.
  Put the normal share link in `mapLink`.
- **Social:** add the profile URL to each entry in `site.social` once the accounts exist.

## Before launch

1. Replace every placeholder (`npm run build` lists them).
2. Set `preview: false` in `src/data/site.ts`. This removes the review banner and highlights
   and lets search engines index the site.
3. Set the real domain in `site.url` (`src/data/site.ts`) and `site` (`astro.config.ts`).
4. Deploy (below), connect the domain, then add the business to Google Business Profile.

## Hosting

The `dist/` folder is a plain static site. Recommended free options:

- **Netlify** or **Cloudflare Pages**: connect the Git repo, build command `npm run build`,
  output directory `dist`.
- Any shared host: upload the contents of `dist/`.

The client pays for the domain (e.g. `agriguardsolutions.com` or a `.com.gh`), around
USD 10–20/year for a .com.

## Structure

```
src/
  data/site.ts            all content + config
  lib/copy.ts             tbc() placeholder helpers
  lib/whatsapp.ts         click-to-chat link builder
  scripts/nav.ts          mobile menu
  scripts/contact-form.ts form validation + submit
  components/             Header, Footer, ProductCard, PhotoSlot, Tbc, ...
  layouts/Base.astro      <head>, SEO meta, structured data, header/footer
  styles/global.css       design tokens + styles
integrations/placeholder-report.ts   build-time placeholder list
public/                   logo, favicon, social preview image
mockup/                   original Home page design mockup (reference only)
```

Brand colours (from the logo): deep green `#12401A` / `#1E5B1E`, leaf green `#5FA82E`,
harvest gold `#E3A82B`. Fonts: Archivo (headings) and Figtree (body), from Google Fonts.
