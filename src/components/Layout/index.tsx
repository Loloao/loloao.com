import React, { FC, useLayoutEffect } from "react";
import Header, { MODE as MODE_VALUE } from "../Header";
import Footer from "../Footer";
import { insertLink } from "../../utils";

export enum MODE_LINK_ID {
  DARK = "dark-mode-link",
  LIGHT = "light-mode-link",
}

interface props {
  onChangeMode?: (MODE_VALUE) => void;
  children?: React.ReactNode;
}

const Content = (props: props) => {
  const DARK_MODE_LINK = "/github-markdown-dark.css";
  const LIGHT_MODE_LINK = "/github-markdown-light.css";
  useLayoutEffect(() => {
    if (!document.getElementById(MODE_LINK_ID.DARK)) {
      insertLink(MODE_LINK_ID.DARK, DARK_MODE_LINK);
      insertLink(MODE_LINK_ID.LIGHT, LIGHT_MODE_LINK);
    }
  });
  // console.log(localStorage)
  return (
    <div className="dark:bg-black min-h-screen h-full dark:text-white bg-orange-50 text-slate-900 ">
      <div className="h-full min-h-screen xl:w-[1280px] sm:px-9 m-auto flex flex-col justify-between">
        <Header onChangeMode={props.onChangeMode} />
        <div className="flex-1 px-3 sm:px-0 min-w-[360px]">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Content;
export const MODE = MODE_VALUE;
