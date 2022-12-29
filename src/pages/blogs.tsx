import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import SideBar from "../components/SideBar";
import SideBarLayout from "../components/SideBarLayout";

export interface Blog {
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
  return (
    <Layout>
      <div className="sidebar-content-wrapper">
        <div className="flex-1 lg:mr-10">
          <SideBarLayout>
            {Array.from(timelineMap.keys()).map((v) => {
              return (
                <BlogList
                  key={v}
                  title={v}
                  blogList={timelineMap.get(v)}
                  doNotShowYear
                />
              );
            })}
          </SideBarLayout>
        </div>
        <SideBar />
      </div>
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
