import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";

const Layout = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === "/";

  if (isWelcomePage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pb-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;