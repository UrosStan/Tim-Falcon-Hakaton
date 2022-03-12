import axios from "axios";
import * as React from "react";
import { Routes, Route, Navigate, useLocation, BrowserRouter, Link } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/Navbar/Navbar";
import { Profile } from "./components/Profile/Profile";
import { SuccessGoogleLogin } from "./components/SuccessGoogleLogin/SuccessGoogleLogin";
import { HttpService } from "./utils/HttpService";

//Route Guard component
const RequireAuth: React.FC<any> = ({ children }) => {
  const location = useLocation();
  const [aut, setAut] = React.useState(true);
  React.useEffect(() => {
    HttpService.checkAuth()
    .then(response => {
      localStorage.setItem("user", JSON.stringify(response.data.payload.user))
      setAut(true)
    })
    .catch(response => setAut(false));
  }, [location])
  return aut === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />
}

export default function App() {
  return (
    <div>
      {/* <Nav /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/successGoogleLogin" element={<SuccessGoogleLogin />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Navbar />
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Navbar />
                <Profile />
              </RequireAuth>
            }
          />


        </Routes>
      </BrowserRouter>
    </div>
  );
}