import "./App.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { SET_USER } from "./context/actions/userActions";
import { SET_PROJECT } from "./context/actions/projectActions";
import { Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";
import Home from "./containers/Home";
import { ProjectPage } from "./containers/ProjectPage";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ViewProject from "./containers/ViewProject";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);

        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
          }
        );
      } else {
        navigate("/home/auth", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 2000);

      return () => unsubscribe();
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // setProjects(
      //   snapshot.docs.map((doc) => ({
      //     id: doc.id,
      //     data: doc.data(),
      //   }))
      // );

      dispatch(
        SET_PROJECT(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
      
    });

    return () => unsubscribe();
  }, []);
  const projects = useSelector((state) => state?.projects?.projects);
  console.log(projects);
  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className=" w-screen h-screen flex justify-start items-start ">
          <Routes>
            <Route path="/home/*" element={<Home/>} />
            <Route path="/newProject" element={<ProjectPage />} />
            <Route path="/view/:projectId" element={<ViewProject />} />
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
