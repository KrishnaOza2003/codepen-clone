import React, { useState } from "react";
import { Logo2 } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";
import { singInWithGoogle } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { fadeInOut } from "../animations";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log(userCred);
        })
        .catch((err) => {
          console.log(err.message);

          if (err.message.includes("invalid-login-credentials")) {
            setAlert(true);
            setAlertMessage("Incorrect Login Credentials !");
          } else if (err.message.includes("missing-password")) {
            setAlert(true);
            setAlertMessage("Please Enter The Password !");
          } else if (err.message.includes("invalid-email")) {
            setAlert(true);
            setAlertMessage("Please Enter a Valid Email !");
          } else {
            setAlert(true);
            setAlertMessage("Temporarily disabled due to many failed login 🙁");
          }

          setInterval(() => {
            setAlert(false);
          }, 5000);
        });
    }
  };

  return (
    <div className=" w-full py-6 ">
      <img
        src={Logo2}
        alt=""
        className=" object-contain w-32 h-auto opacity-50 "
      />
      <div className=" w-full flex flex-col items-center justify-center py-8 ">
        <p className=" text-primaryText text-2xl py-12 ">Join With Us ! 🤩</p>

        <div className=" px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            label={"Email"}
            placeholder={"Email"}
            isPassword={false}
            key={"Email"}
            value={email}
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            isEmailValid={getEmailValidationStatus}
            setIsEmailValid={setGetEmailValidationStatus}
          />

          {/* password */}
          <UserAuthInput
            label={"Password"}
            placeholder={"Password"}
            isPassword={true}
            key={"Password"}
            value={password}
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          {/* alert section */}
          <AnimatePresence>
            {alert && (
              <motion.p
                key={"AlertMessage"}
                {...fadeInOut}
                className=" text-red-500"
              >
                {alertMessage}
              </motion.p>
            )}
          </AnimatePresence>

          {/* login button */}
          {isLogin ? (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-full py-3
rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
                onClick={loginWithEmailAndPassword}
              >
                <p className=" text-xl text-white ">Login</p>
              </motion.div>

              <p className="text-sm text-primaryText flex items-center justify-center gap-3">
                Don't Have an Account ?{" "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-500 cursor-pointer"
                >
                  Create Here
                </span>
              </p>
            </>
          ) : (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-full py-3
rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
                onClick={createNewUser}
              >
                <p className=" text-xl text-white ">Sign Up</p>
              </motion.div>

              <p className="text-sm text-primaryText flex items-center justify-center gap-3">
                Already Have an Account ?{" "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-500 cursor-pointer"
                >
                  Login Here
                </span>
              </p>
            </>
          )}

          {/* or section */}

          <div className=" flex items-center justify-center gap-7 ">
            <div className=" h-[1px] w-40 rounded-md bg-[rgba(256,256,256,0.2)] "></div>
            <p className=" text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className=" h-[1px] w-40 rounded-md bg-[rgba(256,256,256,0.2)] "></div>
          </div>

          {/* signin with google */}
          <motion.div
            onClick={singInWithGoogle}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className=" text-3xl text-white" />
            <p className=" text-xl text-white ">Sign in with Google</p>
          </motion.div>

          {/* or section */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
