import React, { ReactNode } from "react";

interface Props {
  title: string;
  needViewAll: boolean;
  children?: ReactNode;
}

export default (props: Props) => (
  <div className="w-full mt-[100px] dark:text-white">
    <div className="flex justify-between mb-5">
      <span className="text-2xl font-bold">{props.title}</span>
      {props.needViewAll ? (
        <button className="text-sm bg-white dark:bg-slate-800 rounded-full border-gray-300 dark:border-transparent border dark:hover:border-slate-500 px-3 hover:border-slate-400">
          查看所有
        </button>
      ) : null}
    </div>
    <div className="text-white">{props.children}</div>
  </div>
);
