import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import SideBar from "../components/SideBar";
import { Blog } from "../pages/blogs";
import SEO from "../components/SEO";

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
      <div className="grid grid-rows-[1fr_auto] lg:grid-cols-[1fr_300px] gap-6 mt-3 sm:mt-0">
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

export const Head = () => <SEO />;

export const query = graphql`
  query tagsQuery($tag: String) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { frontmatter: { date: DESC } }
    ) {
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
