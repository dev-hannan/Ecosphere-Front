import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Header";
const Layout = () => {
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token && !["/sign-in", "/sign-up"].includes(location.pathname)) {
      window.location.href = "/sign-in";
    }
  }, [location]);
  return (
    <>
      {token && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
