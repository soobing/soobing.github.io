module.exports = {
  host: 'https://soobing.github.io',
  sitemap: 'https://soobing.github.io/sitemap.xml',
  resolveEnv: () => process.env.GATSBY_ENV,
  env: {
    development: {
      policy: [{ userAgent: '*', disallow: ['/'] }]
    },
    production: {
      policy: [{ userAgent: '*', allow: '/' }]
    }
  }
};