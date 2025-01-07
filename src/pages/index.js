import { Routes, Route } from "react-router-dom";
import Market from "./Market";

const Page = () => {
  return (
    <Routes>
      <Route path="/" element={<Market />}></Route>
      <Route path="/comunity" element={<Market />}></Route>
      <Route path="/policy" element={<Market />}></Route>
      <Route path="/faq" element={<Market />}></Route>
    </Routes>
  );
};

export default Page;
