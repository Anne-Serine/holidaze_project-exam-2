import Header from "./components/layout/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SingleVenue from "./pages/SingleVenue";
import Profile from "./pages/Profile";
import VenueManagement from "./pages/VenueManagement";
import PageNotFound from "./pages/404";
import Footer from "./components/layout/Footer";

function MainLayout() {
  let location = useLocation();
  const hideHeaderFooter = ["/login", "/login/", "/register", "/register/"].includes(location.pathname);

  return (
    <>
    {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/venue/:id" element={<SingleVenue />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/venue/manage/" element={<VenueManagement />} />
          <Route path="/venue/manage/:id" element={<VenueManagement />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default MainLayout;