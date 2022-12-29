import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";

import Layout, { MODE } from "../components/Layout";
import BlogList from "../components/BlogList";
import SideBar from "../components/SideBar";
import { Blog } from "../pages/blogs";

export default ({ data }) => {
  const {
    allMarkdownRemark: { nodes },
  } = data;
  const blogs = nodes.map((v) => v.frontmatter);
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
                doNotShowYear
                key={v}
                title={v}
                blogList={timelineMap.get(v)}
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
  query tagsQuery($tag: String) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      nodes {
        frontmatter {
          title
          date
          slug
        }
      }
    }
  }
`;
