import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateSitemap() {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/articles?pagination[pageSize]=100&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`,
        },
      }
    );

    const posts = response.data.data;
    const siteUrl = 'https://iure.dev';

    const urls = [
      {
        loc: siteUrl,
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        loc: `${siteUrl}/blog`,
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: `${siteUrl}/about`,
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: `${siteUrl}/manual`,
        changefreq: 'monthly',
        priority: 0.7,
      },
    ];
    posts.forEach((post) => {
      urls.push({
        loc: `${siteUrl}/blog/${post.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: post.updatedAt,
      });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`
    )
    .join('')}
</urlset>`;

    writeFileSync(join(dirname(__dirname), 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
