import * as React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import BlockWrapper from "../components/BlockWrapper";
// import Helmet from "react-helmet";
import { SEO } from "../components/SEO";
import config from "../utils/config";

export default function Home({ data }) {
  const latest = data.allMarkdownRemark.edges.map((v) => v.node.frontmatter);
  return (
    <Layout>
      <h1 className="text-4xl font-bold mt-[100px]">嗨！我是 Loloao!</h1>
      <br />
      <div className="text-lg mt-6">欢迎来到我的 web 基地.</div>
      <div className="text-lg mt-6">
        我是一名前端工程师，2017
        年入行，目前在深圳工作。在这个博客我会分享看过的书，学习过的知识以及我的生活。我喜欢画漫画，读书以及游戏。
      </div>

      <BlockWrapper title="最近更新">
        <BlogList title="" needViewAll blogList={latest} />
      </BlockWrapper>

      {/* <BlockWrapper title="项目">
        <div>
          
        </div>
      </BlockWrapper> */}
    </Layout>
  );
}

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 6) {
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
