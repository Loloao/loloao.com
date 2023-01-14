import { graphql, Link } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout, { MODE, MODE_LINK_ID } from "../components/Layout";
import SidebarWrapper from "../components/SidebarWrapper";
import { formatDateToCn } from "../utils";
import Tags from "../components/Tags";
import "../styles/blogTemplate.css";
import "../styles/github-markdown-dark.css";
import "../styles/github-markdown-light.css";
import SEO from "../components/SEO";

interface DetailContent {
  title: string;
  content: string[];
  type?: string;
}

export default ({ data }) => {
  const {
    markdownRemark: {
      html,
      excerpt,
      frontmatter: { title, date, category, tags },
    },
  } = data;

  return (
    <Layout>
      <div className="grid grid-rows-[1fr_auto] lg:grid-cols-[1fr_300px] gap-6 mt-3 sm:mt-0">
        {/* 设置 max-width 和 min-width 才为响应式 */}
        <article className="max-w-full min-w-0">
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
        <SidebarWrapper title="详情">
          <ul>
            <li className="list-disc marker:text-red-500 marker:text-lg ml-5">
              {`发布于${formatDateToCn(date)}`}
            </li>
          </ul>
          <h3 className="font-bold py-3 dark:text-white">专栏</h3>
          <ul>
            <li className="list-disc marker:text-red-500 marker:text-lg ml-5">
              <Link
                to={`/category/${category}`}
                className="
                 cursor-pointer underline text-pink-500 hover:text-pink-700 transition-all  list-disc marker:text-red-500 marker:text-lg "
              >
                {category}
              </Link>
            </li>
          </ul>
          <h3 className="font-bold py-3 dark:text-white">标签</h3>
          <Tags tagsList={tags} />
        </SidebarWrapper>
      </div>
    </Layout>
  );
};

export const Head = ({ data }) => {
  const {
    markdownRemark: {
      excerpt,
      frontmatter: { title, thumbnail },
    },
  } = data;
  const blogSEO = {
    title,
    excerpt,
    thumbnail,
  };
  return <SEO blogSEO={blogSEO} />;
};

export const query = graphql`
  query queryBlog($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 100)
      id
      html
      frontmatter {
        date
        category
        description
        slug
        path
        tags
        title
        thumbnail
      }
    }
  }
`;
