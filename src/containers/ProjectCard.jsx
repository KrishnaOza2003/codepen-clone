import React from "react";
import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProjectPage } from "./ProjectPage";

export const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => {
        navigate("/home/projectPage", { replace: true });
      }}
      key={index}
      className=" hover:opacity-70 cursor-pointer w-full md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4"
    >
      <div
        className=" bg-primary w-full h-full rounded-md overflow-hidden "
        style={{ overflow: "hidden", height: "100%" }}
      >
        <iframe
          title="Result"
          srcDoc={project.output}
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
      <div className=" flex items-center justify-start gap-3 w-full">
        {/* image */}
        <div className=" w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500 ">
          {project?.user?.photoURL ? (
            <>
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={project?.user?.photoURL}
                alt={project?.user?.displayName}
                referrerPolicy="no-referrer"
                className=" w-full h-full object-cover"
              />
            </>
          ) : (
            <p className=" text-white text-xl font-semibold capitalize ">
              {" "}
              {project?.user?.email[0]}{" "}
            </p>
          )}
        </div>
        {/* name section */}
        <div>
          <p className=" text-white text-lg capitalize">{project?.title}</p>
          <p className=" text-primaryText text-sm capitalize ">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project?.user?.email.split("@")[0]}`}
          </p>
        </div>

        <motion.div
          className=" cursor-pointer ml-auto "
          whileTap={{ scale: 0.9 }}
        >
          <MdBookmark className=" text-primaryText text-3xl" />
        </motion.div>
      </div>
      <Routes>
        <Route
          exact
          path="/home/projectPage"
          element={<ProjectPage project={project} />}
        />
      </Routes>
    </motion.div>
  );
};
