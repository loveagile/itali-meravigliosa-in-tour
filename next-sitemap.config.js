/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.siteUrl || 'https://www.italiameravigliosaintour.it',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/sitemap.xml', '/server-sitemap.xml'],
  generateRobotsTxt: true,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/navigate'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'test-bot',
        allow: ['/path', '/path-2'],
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/sub-path-1', '/path-2'],
      },
    ],
    additionalSitemaps: [
      'https://www.italiameravigliosaintour.it/sitemap.xml',
      'https://www.italiameravigliosaintour.it/server-sitemap.xml',
    ],
  },
}