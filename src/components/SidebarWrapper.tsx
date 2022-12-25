import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default (props: Props) => {
  return (
    <aside className="hidden lg:flex h-fit px-5 py-4 min-w-[300px] border rounded-md  dark:border-zinc-800 dark:bg-zinc-900 bg-white ml-5 flex-col">
      <h3 className="font-bold text-lg mb-3">{props.title}</h3>
      <div className="dark:text-gray-300">{props.children}</div>
    </aside>
  );
};
