import React from "react";

import "./src/styles/global.css";
import Layout from "./src/components/Layout.tsx";

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>;
};
