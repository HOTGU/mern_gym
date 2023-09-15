import { Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default Router;
