import { Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute";
import Auth from "./routes/Auth";
import Home from "./routes/Home";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        }
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default Router;
