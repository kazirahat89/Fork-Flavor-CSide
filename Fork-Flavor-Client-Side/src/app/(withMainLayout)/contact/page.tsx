import React from "react";
import { Metadata } from "next";

import MainContentsOfContactUs from "./MainContents";

export const metadata: Metadata = {
  title: "Fork & Flavor || Contact us",
  description:
    "If you have any doubts, please contact us by submitting the following form.",
};

const ContactUs = () => {
  return (
    <div>
      <MainContentsOfContactUs />
    </div>
  );
};

export default ContactUs;
