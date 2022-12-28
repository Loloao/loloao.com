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
  return (
    <div>
      <div className="w-full dark:text-white">
        <div className="flex justify-between my-5">
          <h2 className="text-3xl font-bold">{props.title}</h2>
          {props.needViewAll ? (
            <button className="text-sm bg-white dark:bg-slate-800 rounded-full border-gray-300 dark:border-transparent border dark:hover:border-slate-500 px-3 hover:border-slate-400">
              查看所有
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col">
        {props.blogList.map((v) => {
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
