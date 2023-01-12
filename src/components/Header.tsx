import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import Nav from "./Nav";
import Moon from "../assets/Moon";
import Sun from "../assets/Sun";
import { isBrowser } from "../utils";

export enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

interface HeaderProps {
  onChangeMode?: (mode: MODE) => void;
}

const Header = (props: HeaderProps) => {
  const { LIGHT, DARK } = MODE;
  const windowGlobal = typeof window !== "undefined" && window;

  const modeValue = isBrowser() && window.localStorage.getItem("mode");
  const [mode, switchMode] = useState<MODE>(modeValue === LIGHT ? LIGHT : DARK);

  useEffect(() => {
    if (mode === DARK) {
      document.documentElement.classList.add(DARK);
      isBrowser() && window.localStorage.setItem("mode", DARK);
    } else {
      document.documentElement.classList.remove(DARK);
      isBrowser() && window.localStorage.setItem("mode", LIGHT);
    }
    props.onChangeMode?.(mode);
  }, [mode]);

  const getModeSvg = () => {
    if (mode === MODE.DARK) return <Moon />;
    else return <Sun />;
  };

  return (
    <header className="min-w-[360px] w-auto px-3 sm:px-0 border-b dark:border-b-slate-800 border-gray-200 sm:border-none flex justify-between sm:mt-[50px]">
      <div>
        <Link
          to="/"
          className="max-sm:hidden mt-7 text-2xl font-bold py-2 dark:text-white text-black"
        >
          Loloao
        </Link>
        <Nav />
      </div>
      <div
        className="flex justify-center items-center dark:hover:border-slate-400 dark:bg-gray-900 dark:border-gray-600 border-gray-500 hover:border-gray-500 border rounded-full cursor-pointer w-10 h-10 self-center"
        onClick={() => switchMode(mode === DARK ? LIGHT : DARK)}
      >
        {getModeSvg()}
      </div>
    </header>
  );
};

export default Header;

// await import("github-markdown-css/github-markdown-light.css");
