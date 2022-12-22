import React, { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface props {
  children?: React.ReactNode;
}

const Content = (props: props) => {
  return (
    <div className="h-screen dark:bg-black dark:text-slate-300 bg-orange-50 text-slate-900 overflow-hidden">
      <div className="xl:w-[1280px] sm:px-9 m-auto">
        <Header />
        {props.children}
        <Footer />
      </div>
    </div>
  );
};

export default Content;
