import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arestarevista.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/painel/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
