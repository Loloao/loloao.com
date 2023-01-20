import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { insertLink, isBrowser } from "../utils";
import modeContext from "../context/modeContext";
import { MODE } from "../utils/constants/enums";
import { useLayoutEffect } from "react";

interface props {
  children?: React.ReactNode;
}

const Content = (props: props) => {
  const [mode, setMode] = useState<MODE>(MODE.DARK);
  const ModeProvider = modeContext.Provider;
  const { DARK, LIGHT } = MODE;

  useEffect(() => {
    const initialMode = isBrowser() && localStorage.getItem("mode");
    setMode(initialMode as MODE);
  }, []);

  useEffect(() => {
    if (mode === DARK) {
      document.documentElement.classList.add(DARK);
      isBrowser() && window.localStorage.setItem("mode", DARK);
    } else {
      document.documentElement.classList.remove(DARK);
      isBrowser() && window.localStorage.setItem("mode", LIGHT);
    }
  }, [mode]);

  return (
    <div className="dark:bg-black min-h-screen h-full dark:text-white bg-orange-50 text-slate-900 ">
      <div className="h-full min-h-screen xl:w-[1280px] sm:px-9 m-auto flex flex-col justify-between">
        <ModeProvider value={mode}>
          <Header changeMode={setMode} />
          <div className="flex-1 px-3 sm:px-0 min-w-[360px]">
            {props.children}
          </div>
          <Footer />
        </ModeProvider>
      </div>
    </div>
  );
};

export default Content;
