import React from "react";
import { Link } from "gatsby";
import useGetCategoriesAndTags from "../utils/hooks/useGetCategoriesAndTags";
import SidebarWrapper from "../components/SidebarWrapper";
import Tags from "./Tags";

export default () => {
  const data = useGetCategoriesAndTags();
  const {
    categorys: { group: categoryList },
    tags: { group: tags },
  } = data;

  const tagsList = tags.map((v) => v.name);

  return (
    <div className="flex flex-col flex-between">
      <SidebarWrapper title="专栏">
        <div className="flex flex-col">
          {categoryList.map((v) => {
            const { name, totalCount } = v;
            return (
              <Link
                className="flex justify-between hover:bg-[#eee] dark:hover:bg-[#222] hover:text-green-600 mb-1 px-2 transition rounded"
                to={"/category/" + name}
                key={name}
              >
                <div>{name}</div>
                <div>{totalCount}</div>
              </Link>
            );
          })}
        </div>
      </SidebarWrapper>
      <br />
      <SidebarWrapper title="标签">
        <Tags tagsList={tagsList} />
      </SidebarWrapper>
    </div>
  );
};
