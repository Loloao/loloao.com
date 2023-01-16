// Import React so that you can use JSX in HeadComponents
const React = require("react");

const HeadComponents = [<script key="set-mode" src="/setMode.js" />];

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};
