import { Route, Routes } from "react-router-dom";

import ProtectRoute from "./components/ProtectRoute";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Community from "./routes/Community";
import CommunityDetail from "./routes/CommunityDetail";

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
      <Route path="/community" element={<Community />} />
      <Route path="/community/:id" element={<CommunityDetail />} />
    </Routes>
  );
};

export default Router;
