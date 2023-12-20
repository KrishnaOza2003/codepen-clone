import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

function UserAuthInput({
  label,
  placeholder,
  isPassword,
  value,
  setStateFunction,
  Icon,
  isEmailValid,
  setIsEmailValid
}) {
  const [showPassword, setShowPassword] = useState(true);
  const handleChange = (e) => {
    setStateFunction(e.target.value);
    if (placeholder === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailRegex.test(value);
      setIsEmailValid(status);
    }
  }
  return (
    <div className=" flex flex-col items-start justify-start gap-1 ">
      <label className=" text-sm text-gray-300 ">{label}</label>
      <div
        className={` flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
          !isEmailValid && placeholder === 'Email' && value.length > 0 && 'border-2 border-red-600'
        }`}
      >
        <Icon className=" text-text555 text-2xl " />
        <input
          type={(isPassword && showPassword) ? "password" : "text"}
          placeholder={placeholder}
          className=" flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg "
          value={value}
          onChange={handleChange}
        />
        {isPassword && (
          <motion.div whileTap={{scale: 0.8}} onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
            {!showPassword ? (
              <FaEyeSlash className=" text-text555 text-2xl " />
            ):(
              <FaEye className=" text-text555 text-2xl " />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default UserAuthInput;
