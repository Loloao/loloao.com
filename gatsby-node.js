const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query MyQuery {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/blog.tsx"),
      context: { slug: node.frontmatter.slug },
    });
  });
};
