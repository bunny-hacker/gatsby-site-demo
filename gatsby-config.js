const dotenv = require("dotenv");
dotenv.config({
  path: ".env.secret"
});

module.exports = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `8wa8mfmne9v1`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};
