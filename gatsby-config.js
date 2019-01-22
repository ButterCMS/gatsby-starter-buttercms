module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    social: {
      twitter :"@gatsbyjs"
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-buttercms`,
      options: {
        authToken: `d94ad21365ea807d1bb2495504e98fd0cf81797c`,
        // Optional. Returns values for the supplied content field keys.
        contentFields: {
          keys: [`faq_items`, `faq_headline`],
          // Optional. Set to 1 to enable test mode for viewing draft content.
          test: 0,
        },
        // Optional. Array of page slugs.
        pages: [`homepage`],
        // Optional. Array of page types.
        pageTypes: [`customer_case_study`],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}