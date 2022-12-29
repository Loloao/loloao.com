import * as React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
// import Helmet from "react-helmet";
import { SEO } from "../components/SEO";
import config from "../utils/config";

export default function Home({ data }) {
  const latest = data.latest.edges.map((v) => v.node.frontmatter);
  console.log(latest, "latest");
  return (
    <Layout>
      <h1 className="text-4xl font-bold mt-[100px]">嗨！我是 Loloao!</h1>
      <br />
      <div className="text-lg mt-6">欢迎来到我的 web 基地.</div>
      <div className="text-lg mt-6">
        我是一名前端工程师，2017
        年入行，目前在深圳工作。在这个博客我会分享我看的书，学习过的技能以及我的生活。我喜欢画漫画，读书以及游戏。
      </div>
      <BlogList title="最近更新" needViewAll blogList={latest} />
    </Layout>
  );
}

export const query = graphql`
  query indexs {
    latest: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
            slug
          }
        }
      }
    }
  }
`;
