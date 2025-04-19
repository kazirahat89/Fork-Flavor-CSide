import { ReactNode } from "react";

import NavigationBar from "@/src/components/UI/Navbar/Navbar";
import Footer from "@/src/components/UI/Footer/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavigationBar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
