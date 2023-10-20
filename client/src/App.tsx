import { ToastContainer } from "react-toastify";
import { PropsWithChildren, useContext } from "react";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "./context/authContext";
import Header from "./components/Header";
import Loader from "./components/Loader";

const RefreshLoader = ({ children }: PropsWithChildren) => {
  const { loading } = useContext(AuthContext) as any;

  if (loading) return <Loader />;

  return <>{children}</>;
};

function App() {
  return (
    <RefreshLoader>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
      <Header />
      <Router />
    </RefreshLoader>
  );
}

export default App;
