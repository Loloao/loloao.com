import React from "react";
import { Link } from "gatsby";

interface Props {
  tagsList: string[];
}

export default (props: Props) => {
  const { tagsList } = props;
  return (
    <div className="flex flex-wrap">
      {tagsList.map((v) => {
        return (
          <Link
            className="px-2 py-0.5 border mb-1 text-black dark:text-slate-300 dark:bg-[#222] dark:border-[#333] cursor-pointer rounded-md mr-1 text-sm dark:hover:border-yellow-500 hover:border-yellow-500"
            to={"/tag/" + v}
            key={v}
          >
            {v}
          </Link>
        );
      })}
    </div>
  );
};
