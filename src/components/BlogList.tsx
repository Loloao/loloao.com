import React from "react";
import { Link } from "gatsby";
import { formatDateToCn } from "../utils";

interface BlogItem {
  title: string;
  slug: string;
  date: string;
}

interface Props {
  title: string;
  blogList: BlogItem[];
  doNotShowYear?: boolean;
  needViewAll?: boolean;
}

export default (props: Props) => {
  const { blogList } = props;

  return (
    <div>
      <div className="w-full dark:text-white my-5">
        <h2 className="text-3xl font-bold">{props.title}</h2>
      </div>
      <div className="flex flex-col">
        {blogList.map((v) => {
          return (
            <Link
              className="text-xl border-b py-2 flex justify-between dark:border-slate-800 border-gray-200 last:border-transparent dark:last:border-transparent"
              to={"/" + v.slug}
              key={v.slug}
            >
              <span className="hover:underline font-bold">{v.title}</span>
              <span className="text-sm dark:text-green-500">
                {formatDateToCn(v.date, { doNotShowYear: props.doNotShowYear })}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
