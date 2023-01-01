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
