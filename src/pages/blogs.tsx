import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import SidebarWrapper from "../components/SidebarWrapper";
import SideBar, { SIDEBAR_TYPE } from "../components/SideBar";

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
      <div className="flex justify-between w-full">
        <div className="flex-1 mr-10">
          {Array.from(timelineMap.keys()).map((v) => {
            return (
              <BlogList title={v} blogList={timelineMap.get(v)} doNotShowYear />
            );
          })}
        </div>
        <div>
          <SidebarWrapper title="专栏">
            <SideBar list={categorys} type={SIDEBAR_TYPE.CATEGORY} />
          </SidebarWrapper>
          <br />
          <SidebarWrapper title="标签">
            <SideBar list={tags} type={SIDEBAR_TYPE.TAG} />
          </SidebarWrapper>
        </div>
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
