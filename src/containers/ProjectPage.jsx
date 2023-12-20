import React, { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import { FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import { Logo3 } from "../assets";
import { motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Link, redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import UserProfileDetails from "../components/UserProfileDetails";
import Alert from "../components/Alert";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export function ProjectPage({ project }) {
  const [html, setHtml] = useState(project?.html || "");
  const [css, setCss] = useState(project?.css || "");
  const [js, setJs] = useState(project?.js || "");
  const [output, setOutput] = useState(project?.output || "");
  const [isTitle, setIsTitle] = useState(false);
  const [title, setTitle] = useState(project?.title || "Untitled");
  const [alert, setAlert] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const user = useSelector((state) => state.user?.user);

  const addProject = async (e) => {
    e.preventDefault();
    setAlert(true);

    await addDoc(collection(db, "projects"), {
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
      timestamp: serverTimestamp(),
    });

    setAlert(false);
    setIsAdded(true);

    setHtml("");
    setCss("");
    setJs("");
    setTitle("");
    setOutput("");
    redirect('/home');
  };

  const updateProject = async (id) => {
    try {
      const projectRef = doc(db, "projects", id);
      setAlert(true);

      await updateDoc(projectRef, {
        title: title,
        html: html,
        css: css,
        js: js,
        output: output,
        user: user,
      });

      setAlert(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOutput = () => {
    const combinedOutput = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            ${js}
          </script>
        </body>
      </html>
    `;

    setOutput(combinedOutput);
  };

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        <AnimatePresence>
          {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
        </AnimatePresence>
        <header className="w-full flex items-center justify-between px-12 py-4 ">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home/projects"}>
              <img className="w-32 h-auto object-contain" src={Logo3} />
            </Link>
            <div className="flex flex-col items-start justify-start">
              {/* title */}
              <div className="flex items-center justify-center gap-3">
                <AnimatePresence>
                  {isTitle ? (
                    <motion.input
                      key={"TitleInput"}
                      type="text"
                      className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base  outline-none border-none"
                      placeholder="Your Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  ) : (
                    <motion.p
                      key={"TitleLabel"}
                      className="px-3 py-2  text-white text-lg"
                    >
                      {title}
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isTitle ? (
                    <motion.div
                      key={"MdCheck"}
                      className="cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsTitle(false)}
                    >
                      <MdCheck className="text-2xl text-emerald-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={"MdEdit"}
                      className="cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsTitle(true)}
                    >
                      <MdEdit className="text-2xl text-primaryText" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-center px-3 -mt-2 gap-2">
                <p className="text-primaryText text-sm">
                  {user?.displayName
                    ? user?.displayName
                    : `${user.email.split("@")[0]}`}
                </p>
                <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer hover:shadow-md hover:shadow-emerald-500"
                >
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            {isAdded ? (
              <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={updateProject}
              className="px-4 py-4 bg-primaryText rounded-xl cursor-pointer text-base text-primary font-semibold"
            >
              Save
            </motion.button>
            ) : (
              <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={addProject}
              className="px-4 py-4 bg-primaryText rounded-xl cursor-pointer text-base text-primary font-semibold"
            >
              Save
            </motion.button>
            )}
            {user && <UserProfileDetails />}
          </div>
        </header>

        <div>
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            <SplitPane split="vertical" minSize={500}>
              {/* html code */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                    <FaHtml5 className="text-xl text-red-500" />
                    <p className="text-primaryText font-semibold border-t-gray-500">
                      HTML
                    </p>
                  </div>
                  <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                    <FcSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
                  </div>
                </div>

                <div className="w-full px-2">
                  <CodeMirror
                    value={html}
                    extensions={[javascript({ jsx: true })]}
                    height="600px"
                    theme="dark"
                    onChange={(value, viewUpdate) => {
                      // console.log("value:", value);
                      setHtml(value);
                    }}
                  />
                </div>
              </div>
              <SplitPane split="vertical" minSize={500}>
                {/* css code */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                      <FaCss3 className="text-xl text-sky-500" />
                      <p className="text-primaryText font-semibold border-t-gray-500">
                        CSS
                      </p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>

                  <div className="w-full px-2">
                    <CodeMirror
                      value={css}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      theme="dark"
                      onChange={(value, viewUpdate) => {
                        //   console.log("value:", value);
                        setCss(value);
                      }}
                    />
                  </div>
                </div>
                {/* js code */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                      <FaJs className="text-xl text-yellow-500" />
                      <p className="text-primaryText font-semibold border-t-gray-500">
                        JS
                      </p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>

                  <div className="w-full px-2">
                    <CodeMirror
                      height="600px"
                      value={js}
                      extensions={[javascript({ jsx: true })]}
                      theme="dark"
                      onChange={(value, viewUpdate) => {
                        //   console.log("value:", value);
                        setJs(value);
                      }}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            <div
              className="bg-white"
              style={{ overflow: "hidden", height: "100%" }}
            >
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
}
