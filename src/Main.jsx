import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemPage from "./components/pages/items";
import HomePage from "./components/pages";
import RegistrationPage from "./components/pages/registration";
function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="items" element={<ItemPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
