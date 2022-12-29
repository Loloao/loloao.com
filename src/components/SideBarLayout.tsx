import React from "react";

export default (props) => {
  return (
    <div className="flex justify-between w-full flex-col lg:flex-row">
      <div className="flex-1 lg:mr-10">{props.children}</div>
    </div>
  );
};
