const createProxyMiddleware = require("http-proxy-middleware")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config = require("gatsby-plugin-config").default

module.exports = {
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
  siteMetadata: {
    title: `Black's Portfolio`,
    description: `
      I'm 19 years old. I'm in the 4th grade IT technical school. I wish to expand my skills as a Frontend developer, and I'm working hard to achieve that
    `,
    author: `@BlacKisEverywhere`,
    siteUrl: "https://blacklyexactly.com",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-transition-link`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Montserrat`,
              variants: ["400", "600", "700", "900"],
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Black's Portfolio`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#F857A6`,
        theme_color: `#F857A6`,
        display: `minimal-ui`,
        icon: `src/assets/images/b.png`,
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: config.DATO_KEY,
        disableLiveReload: false,
        preview: false,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-functions`,
      options: {
        functionsSrc: `${__dirname}/src/functions`,
        functionsOutput: `${__dirname}/functions`,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.blacklyexactly.com",
        sitemap: "https://www.blacklyexactly.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
}
