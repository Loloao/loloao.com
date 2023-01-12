import { graphql, useStaticQuery } from "gatsby";

interface Option {
  doNotShowYear?: boolean;
}

export const formatDateToCn = (
  time: string,
  option: Option = {
    doNotShowYear: false,
  }
) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (option.doNotShowYear) {
    return `${month}月${day}日`;
  }
  return `${month}月${day}日, ${year}`;
};

export const useGetCategoriesAndTags = () => {
  const data = useStaticQuery(graphql`
    query extraQuery {
      categorys: allMarkdownRemark {
        group(field: { frontmatter: { category: SELECT } }) {
          name: fieldValue
          totalCount
        }
      }
      tags: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          name: fieldValue
          totalCount
        }
      }
    }
  `);
  return data;
};

export const insertLink = (linkId: string, linkHref: string) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = linkHref;
  link.media = "all";
  head.appendChild(link);
};

// 由于 gatsby 生成静态文件时没有 window 对象(只有在浏览器才有 window 对象)
// 所以需要判断是否存在 window 再调用 window 的方法比如 localStorage
export const isBrowser = () => typeof window !== "undefined";
