import React from "react";
import { useEffect } from "react";
import { MODE } from "../utils/constants/enums";

interface Props {
  mode: MODE;
}

export default (props: Props) => {
  const { mode } = props;
  const mountComments = () => {
    const commentsWrapper = document.getElementById("comments-wrapper");
    console.log(
      commentsWrapper?.childNodes,
      commentsWrapper?.hasChildNodes,
      "nodes"
    );
    const commentScript = document.createElement("script");

    commentScript.async = true;
    commentScript.src = "https://utteranc.es/client.js";
    commentScript.setAttribute("repo", "Loloao/comments");
    commentScript.setAttribute("issue-term", "title");
    commentScript.setAttribute("id", "utterances");
    commentScript.setAttribute("defer", true);
    commentScript.setAttribute(
      "theme",
      mode === MODE.LIGHT ? "github-light" : "github-dark"
    );
    commentScript.setAttribute("crossorigin", "anonymous");
    commentScript.onload = () => {
      if (
        commentsWrapper?.hasChildNodes &&
        commentsWrapper.childNodes.length > 1
      ) {
        commentsWrapper.removeChild(commentsWrapper.childNodes[0]);
      }
    };

    commentsWrapper?.appendChild(commentScript);
  };

  useEffect(() => {
    mountComments();
  }, [mode]);
  return <div id="comments-wrapper" />;
};
