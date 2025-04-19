import React from "react";
import { Metadata } from "next";

import MainContentsOfRegister from "./MainContents";

export const metadata: Metadata = {
  title: "Fork & Flavor || Sign Up",
  description: "Sign Up to be a member!",
};

const RegisterPage = () => {
  return (
    <div>
      <MainContentsOfRegister />
    </div>
  );
};

export default RegisterPage;
