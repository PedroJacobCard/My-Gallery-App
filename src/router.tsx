import AllFotos from "./pages/Gallery/Gallery";

import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import SignupLoginPage from "./pages/Login/SignupLogin";
import useUser from "./hook/useUser";

function Router() {
  const { user } = useUser()
  type ChildrenType = {
    children: JSX.Element;
  }
  const Privet = ({children}: ChildrenType) => {
    if (!user) {
      return <Navigate to="/" />
    }
    return children;
  }
  
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupLoginPage />} />
      <Route
        path='/gallery'
        element={
          <Privet>
            <AllFotos />
          </Privet>
        }
      />
    </Routes>
  );
}

export default Router