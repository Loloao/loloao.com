// Import React so that you can use JSX in HeadComponents
const React = require("react");

const HeadComponents = [<script key="set-mode" src="/setMode.js" />];

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};

const Layout = require("./src/components/Layout.tsx").default;

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>;
};
