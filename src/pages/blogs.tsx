import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

interface Blog {
  title: string;
  date: string;
  slug: string;
}

export default function blogs({ data }) {
  console.log(data, "data");
  const {
    blogs: { edges: nodes, distinct: tags },
    categorys: { distinct: categorys },
  } = data;

  const blogs = nodes.map((v) => v.node.frontmatter);
  const timelineMap = new Map();
  (blogs as Blog[]).reduce<Map<string, Blog[]>>((sum, next) => {
    const { date } = next;
    const year = new Date(date).getFullYear() + "";

    if (sum.has(year)) {
      const blogs = sum.get(year);
      blogs?.push(next);
    } else {
      sum.set(year, [next]);
    }

    return sum;
  }, timelineMap);
  console.log(timelineMap, "timelineMap");
  return (
    <Layout>
      <div>博客</div>
      {Array.from(timelineMap.keys()).map((v) => {
        const year = v;
        const blogs = timelineMap.get(year);
        console.log(v, "v");
        return (
          <div key={year}>
            <div>{year}</div>
            {blogs.map((v) => {
              return <div key={v.slug}>{v.title}</div>;
            })}
          </div>
        );
      })}
    </Layout>
  );
}

export const query = graphql`
  query MyQuery {
    blogs: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          frontmatter {
            date
            slug
            title
          }
        }
      }
      distinct(field: { frontmatter: { tags: SELECT } })
    }
    categorys: allMarkdownRemark {
      distinct(field: { frontmatter: { category: SELECT } })
    }
  }
`;
