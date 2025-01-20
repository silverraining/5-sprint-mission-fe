import Footer from "./footer";
import Header from "./header";
import LandingHeader from "./header/LandingHeader";

function App({ children }) {
  const isLandingPage = window.location.pathname === "/";

  return (
    <>
      {isLandingPage ? <LandingHeader /> : <Header />}
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default App;
