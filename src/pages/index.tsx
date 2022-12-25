import * as React from "react";
import Layout from "../components/Layout";
import Typography from "../components/Typography";
import { formatDateToCn } from "../utils";
// import Helmet from "react-helmet";
import { SEO } from "../components/SEO";
import config from "../utils/config";
import { graphql, Link } from "gatsby";

export default function Home({ data }) {
  const latest = data.latest.edges;
  return (
    <Layout>
      <h1 className="text-4xl font-bold mt-[100px]">嗨！我是 Loloao!</h1>
      <br />
      <div className="text-lg mt-6">欢迎来到我的 web 基地.</div>
      <div className="text-lg mt-6">
        我是一名前端工程师，2017
        年入行，目前在深圳工作。在这个博客我会分享我看的书，学习过的技能以及我的生活。我喜欢画漫画，读书以及游戏。
      </div>

      <Typography title="最近更新" needViewAll>
        {latest.map((v) => {
          const {
            frontmatter: { description, date, slug },
            id,
          } = v.node;
          return (
            <Link
              to={slug}
              className="py-3 dark:border-b-gray-700 border-b-gray-300 border-b text-xl flex justify-between items-center cursor-pointer"
              key={id}
            >
              <span className="text-black dark:text-white hover:underline">
                {description}
              </span>
              <span className="text-[0.875rem] text-gray-700 dark:text-purple-500 sm:block hidden">
                {formatDateToCn(date)}
              </span>
            </Link>
          );
        })}
      </Typography>
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
            slug
          }
        }
      }
    }
  }
`;
