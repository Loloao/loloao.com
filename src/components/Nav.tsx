import React from "react";
import { Link } from "gatsby";
import ExternalLinkIcon from "../assets/ExternalLinkIcon";

export interface NavItem {
  link: string;
  title: string;
  color: string;
  isMobileOnly?: boolean;
  isDeskOnly?: boolean;
}

type NavList = NavItem[];

const navList: NavList = [
  {
    link: "/",
    title: "首页",
    color: "border-b-lime-400",
    isMobileOnly: true,
  },
  {
    link: "/about",
    title: "关于",
    color: "border-b-blue-700",
  },
  {
    link: "/blogs",
    title: "博客",
    color: "border-b-fuchsia-700",
  },
  {
    link: "/tags",
    title: "标签",
    color: "border-b-yellow-400",
  },
];

const ExternalLinks = [
  {
    title: "Github",
    link: "https://www.github.com/Loloao",
    color: "border-b-green-700",
  },
];

const Nav = () => {
  return (
    <nav className="dark:text-slate-400 text-slate-700 flex h-14 items-center text-lg">
      {navList.map((v, i) => {
        return (
          <div key={v.link}>
            <Link
              to={v.link}
              className={`${
                v.color
              } cursor-pointer block h-7.5 transition-all text-center hover:border-b-2 dark:hover:text-white mr-6 ${
                v.isMobileOnly ? "sm:hidden" : ""
              }`}
            >
              <span>{v.title}</span>
            </Link>
          </div>
        );
      })}

      {ExternalLinks.map((v, i) => {
        return (
          <a
            key={v.link}
            className={`hover:border-b-2 dark:hover:text-white ${v.color} flex justify-center items-center max-sm:hidden`}
            href={v.link}
          >
            {v.title}&nbsp;
            <ExternalLinkIcon />
          </a>
        );
      })}
    </nav>
  );
};

Nav.defaultProps = {
  navList: [],
};
export default Nav;
