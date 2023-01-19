import React from "react";
import { useEffect } from "react";
import { MODE } from "../utils/constants/enums";

interface Props {
  mode: MODE;
}

export default (props: Props) => {
  const { mode } = props;
  const mountComments = () => {
    console.log(mode, "mode");
    const commentsWrapper = document.getElementById("comments-wrapper");
    if (commentsWrapper?.hasChildNodes) {
      commentsWrapper.innerHTML = "";
    }
    const commentScript = document.createElement("script");

    commentScript.async = true;
    commentScript.src = "https://utteranc.es/client.js";
    commentScript.setAttribute("repo", "Loloao/comments");
    commentScript.setAttribute("issue-term", "title");
    commentScript.setAttribute("id", "utterances");
    commentScript.setAttribute(
      "theme",
      mode === MODE.LIGHT ? "github-light" : "github-dark"
    );
    commentScript.setAttribute("crossorigin", "anonymous");

    commentsWrapper?.appendChild(commentScript);
  };

  useEffect(() => {
    console.log("trigger mount comment");
    mountComments();
  }, [mode]);
  return <div id="comments-wrapper" />;
};
