import React from "react";

import Gatsby from "../assets/Gatsby";
import Github from "../assets/Github";
import ReactLogo from "../assets/React";

interface LinkItem {
  url: string;
  label: string;
  comp?: JSX.Element;
}

const links: LinkItem[] = [
  // { url: "https://taniarascia.substack.com", label: "Newsletter" },
  // { url: "https://ko-fi.com/taniarascia", label: "Ko-Fi" },
  // { url: "https://patreon.com/taniarascia", label: "Patreon" },
  // { url: "https://www.taniarascia.com/rss.xml", label: "RSS" },
];
const madeWithLinks: LinkItem[] = [
  { url: "https://www.gatsbyjs.org/", label: "Gatsby", comp: <Gatsby /> },
  { url: "https://github.com/Loloao", label: "GitHub", comp: <Github /> },
  { url: "https://reactjs.org/", label: "React", comp: <ReactLogo /> },
];

export default () => {
  return (
    <footer className="flex justify-center">
      <section>
        <nav className="flex justify-center mb-3">
          <span className="hidden sm:block">Made by Loloao</span>
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="flex justify-center">
          {madeWithLinks.map((link) => (
            <a
              className="flex mr-3"
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <span>{link.label}</span>
              {link.comp}
            </a>
          ))}
        </nav>
      </section>
    </footer>
  );
};
