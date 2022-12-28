import React from "react";
import { Link } from "gatsby";

export enum SIDEBAR_TYPE {
  CATEGORY = "catetory",
  TAG = "tag",
}

interface Props {
  list: string[];
  type: SIDEBAR_TYPE;
}

const classNameMap = {
  [SIDEBAR_TYPE.CATEGORY]: "hover:bg-red-900 mb-1 px-2 transition rounded",
  [SIDEBAR_TYPE.TAG]: "",
};

export default (props: Props) => {
  const { type } = props;
  const isCategory = type === SIDEBAR_TYPE.CATEGORY;
  return (
    <div className={`flex ${isCategory ? "flex-col" : ""} `}>
      {props.list.map((v) => {
        return (
          <Link className={classNameMap[props.type]} to={"/" + v} key={v}>
            {v}
          </Link>
        );
      })}
    </div>
  );
};
