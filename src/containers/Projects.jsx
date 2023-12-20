import React from "react";
import { ProjectCard } from "./ProjectCard";
import { useSelector } from "react-redux";

function Projects() {

  const projects = useSelector((state) => state?.projects?.projects);

  console.log(projects);
  return (
    <div className=" w-full py-6 flex items-center justify-center gap-6 flex-wrap ">
      {projects &&
        projects.map((project, index) => (
          <ProjectCard key={project?.id} project={project.data} index={index} />
        ))}
    </div>
  );
}

export default Projects;
