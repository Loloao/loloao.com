import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import SideBar from "../components/SideBar";
import { Blog } from "../pages/blogs";
import SEO from "../components/SEO";

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
      <div className="grid grid-rows-[1fr_auto] lg:grid-cols-[1fr_300px] gap-6 mt-3 sm:mt-0">
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

export const Head = () => <SEO />;

export const query = graphql`
  query categoriesQuery($category: String) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
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
