const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query MyQuery {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
            category
          }
        }
        distinct(field: { frontmatter: { tags: SELECT } })
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/blog.tsx"),
      context: { slug: node.frontmatter.slug },
    });

    actions.createPage({
      path: `/category/${node.frontmatter.category}`,
      component: path.resolve("./src/templates/categories.tsx"),
      context: { category: node.frontmatter.category },
    });
  });

  data.allMarkdownRemark.distinct.forEach((tag) => {
    actions.createPage({
      path: `/tag/${tag}`,
      component: path.resolve("./src/templates/tags.tsx"),
      context: { tag },
    });
  });
};
