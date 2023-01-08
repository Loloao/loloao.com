import { graphql, Link } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout, { MODE } from "../components/Layout";
import SidebarWrapper from "../components/SidebarWrapper";
import { formatDateToCn } from "../utils";
import Tags from "../components/Tags";
import "../styles/blogTemplate.css";
import SEO from "../components/SEO";

const DARK_MODE_LINK = "/github-markdown-dark.css";
const LIGHT_MODE_LINK = "/github-markdown-light.css";

interface DetailContent {
  title: string;
  content: string[];
  type?: string;
}

export default ({ data }) => {
  const localMode = localStorage.getItem("mode");
  const [modeLink, changeModeLink] = useState<string>(
    localMode ? DARK_MODE_LINK : LIGHT_MODE_LINK
  );

  useEffect(() => {}, [modeLink]);
  const {
    markdownRemark: {
      html,
      excerpt,
      frontmatter: { title, date, category, tags },
    },
  } = data;

  const onChangeMode = (mode) => {
    if (mode === MODE.DARK) {
      changeModeLink(DARK_MODE_LINK);
    } else {
      changeModeLink(LIGHT_MODE_LINK);
    }
  };

  return (
    <Layout onChangeMode={onChangeMode}>
      <link rel="stylesheet" type="text/css" href={modeLink} />
      <div className="flex flex-col lg:flex-row">
        <article className="flex-1 lg:mr-5 mb-5">
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
                 cursor-pointer underline text-indigo-500 list-disc marker:text-red-500 marker:text-lg ml-5"
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
