import React from "react";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="p-5 max-w-[500px] mx-auto">
      <h1 className="text-3xl font-semibold my-2">Create new account</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
