const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  await new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/components/BlogPost/index.tsx')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  id
                  title {
                    title
                  }
                  slug
                  titleImage {
                    title
                    file {
                      url
                    }
                  }
                  body {
                    raw
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              ...post.node,
              // rich text guide: https://www.contentful.com/developers/docs/tutorials/general/rich-text-and-gatsby/
              bodyParsed: JSON.parse(post.node.body.raw),
            },
          })
        })
      })
    )
  })
}
