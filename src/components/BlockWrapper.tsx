import React from "react";

interface Props {
  title: string;
  needViewAll?: boolean;
  children: React.ReactNode;
}

export default function BlockWrapper(props: Props) {
  return (
    <div className="my-[80px]">
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
      {props.children}
    </div>
  );
}
