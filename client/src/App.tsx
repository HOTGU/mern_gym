import AuthContextProvider from "./context/authContext";
import Router from "./Router";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
