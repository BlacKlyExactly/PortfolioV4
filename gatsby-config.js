const createProxyMiddleware = require("http-proxy-middleware");

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config = require('gatsby-plugin-config').default;

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
      I'm a Hobbystic Frontend Dev.
      I create websites from userside and I'm responsible for your expiriences of using websites.
      I hope you enjoy my work!
    `,
    author: `@BlacKisEverywhere`,
    siteUrl: "https://blackly-exactly.netlify.app/"
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
          include: /assets/ // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Montserrat`,
              variants: [ '400', '600', '700', '900' ]
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
  ],
}
