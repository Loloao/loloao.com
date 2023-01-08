import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";

import Layout, { MODE } from "../components/Layout";
import BlogList from "../components/BlogList";
import SideBar from "../components/SideBar";
import { Blog } from "../pages/blogs";

export default ({ data }) => {
  const {
    allMarkdownRemark: { edges },
  } = data;
  const blogs = edges.map((v) => v.node.frontmatter);
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
        <div className="flex-1 mr-10">
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
        </div>
        <SideBar />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query categoriesQuery($category: String) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            date
            slug
            title
          }
        }
      }
    }
  }
`;
