import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout, { MODE } from "../components/Layout";
import SidebarWrapper from "../components/SidebarWrapper";
import { formatDateToCn } from "../utils";
import "../styles/blogTemplate.css";
import Helmet from "react-helmet";

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

  const detailSidebarContent: DetailContent[] = [
    { title: "", content: [`发布于${formatDateToCn(date)}`] },
    { title: "专栏", content: [category], type: "link" },
    { title: "标签", content: tags, type: "tags" },
  ];

  const getDetailContent = (detailContentConfig: DetailContent[]) => {
    return detailContentConfig.map((v) => {
      return (
        <div key={v.title}>
          {v.title && (
            <h3 className="font-bold py-3 dark:text-white">{v.title}</h3>
          )}
          <ul className={`mb-3 ${v.type === "tags" ? "flex" : ""}`}>
            {v.content.map((v1) => {
              if (v.type === "tags") {
                return (
                  <li
                    className="px-2 py-0.5 border text-black dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700 cursor-pointer rounded-md mr-3 text-sm dark:hover:border-yellow-500 hover:border-yellow-500"
                    key={v1}
                  >
                    <div>{v1}</div>
                  </li>
                );
              }
              return (
                <li
                  className={`${
                    v.type === "link"
                      ? "cursor-pointer underline text-indigo-500"
                      : ""
                  } list-disc marker:text-red-500 marker:text-lg ml-5`}
                  key={v1}
                >
                  {v1}
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <>
      <Layout onChangeMode={onChangeMode}>
        <link rel="stylesheet" type="text/css" href={modeLink} />
        <div className="flex">
          <article
            className="markdown-body flex-1"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <SidebarWrapper title="详情">
            {getDetailContent(detailSidebarContent)}
          </SidebarWrapper>
        </div>
      </Layout>
    </>
  );
};

export const query = graphql`
  query queryBlog($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
      }
    }
  }
`;
