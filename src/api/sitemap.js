export default async function handler(req, res) {
    const siteUrl = "https://itm-student-hub.vercel.app";
  
    // Define your static pages
    const staticPages = [
      "",
      "about",
      "events",
      "contact",
      "blog",
    ];
  
    // Create sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>${siteUrl}/${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>${page === "" ? 1.0 : 0.8}</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;
  
    // Set response headers
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  }
  