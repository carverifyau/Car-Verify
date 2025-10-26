import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://car-verify.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/report/',
        '/checkout/success/',
        '/payment/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}