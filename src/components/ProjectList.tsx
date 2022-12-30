import React from "react";

export interface Project {
  name: string;
  githubAddr: string;
  demoAddr: string;
  articleAddr: string;
  date: string;
}

interface Props {
  projectList: Project[];
}

export default function ProjectList(props: Props) {
  const { projectList } = props;
  return (
    <div className="">
      {projectList.map((v) => {
        return (
          <div key={v.name} className="">
            {v.name}
          </div>
        );
      })}
    </div>
  );
}
