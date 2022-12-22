import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Moon from "../assets/Moon";
import Sun from "../assets/Sun";

const Header = () => {
  const [mode, switchMode] = useState<boolean>(true);

  useEffect(() => {
    if (mode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [mode]);

  const getModeSvg = () => {
    if (mode) return <Moon />;
    else return <Sun />;
  };

  return (
    <header className="min-w-[400px] w-auto px-3 sm:px-0 border-b dark:border-b-slate-800 border-gray-200 sm:border-none flex justify-between">
      <div>
        <div className="max-sm:hidden mt-7 text-2xl font-bold py-2 dark:text-white text-black">
          Loloao
        </div>
        <Nav />
      </div>
      <div
        className="flex justify-center items-center dark:hover:border-slate-400 dark:bg-gray-900 dark:border-gray-600 border-gray-500 hover:border-gray-500 border rounded-full cursor-pointer w-10 h-10 self-center"
        onClick={() => switchMode(!mode)}
      >
        {getModeSvg()}
      </div>
    </header>
  );
};

export default Header;
