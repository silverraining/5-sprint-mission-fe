import React from "react";
import Header from "./common/Header";
import LandingHeader from "./common/LandingHeader";
import Footer from "./common/Footer";
type AppProps = {
  children?: React.ReactNode;
};
const App: React.FC<AppProps> = ({ children }) => {
  const isLandingPage = window.location.pathname === "/";
  return (
    <>
      {isLandingPage ? <LandingHeader /> : <Header />}
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default App;
