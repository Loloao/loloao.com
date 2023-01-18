import React from "react";
import { useEffect } from "react";
import { MODE } from "./Header";

interface Props {
  mode: MODE;
}

export default (props: Props) => {
  const { mode } = props;
  const mountComments = () => {
    const commentsWrapper = document.getElementById("comments-wrapper");
    const commentScript = document.createElement("script");
    const theme = localStorage.getItem("mode");

    commentScript.async = true;
    commentScript.src = "https://utteranc.es/client.js";
    commentScript.setAttribute("repo", "Loloao/comments");
    commentScript.setAttribute("issue-term", "title");
    commentScript.setAttribute("id", "utterances");
    commentScript.setAttribute(
      "theme",
      theme === MODE.LIGHT ? "github-light" : "github-dark"
    );
    commentScript.setAttribute("crossorigin", "anonymous");

    commentsWrapper?.appendChild(commentScript);
  };

  useEffect(() => {
    mountComments();
  }, [mode]);
  return <div id="comments-wrapper" />;
};
