import { Link } from "react-router-dom";
import Nav from "./Nav";
import { Menu, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/Store";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <header className="relative bg-daze-bg text-daze-text py-3 flex flex-col gap-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="scale-75 md:scale-100">
          <img src="/assets/logo.svg" alt="Holidaze logo" />
        </Link>
        <button
          className="p-3"
          onClick={logoutUser}
          >
          <UserRound size={30} className="scale-75 md:scale-100" />
          {token ? "Logout" : "Login"}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex order-1 w-auto md:hidden"
        >
          <Menu />
        </button>
      </div>
      <Nav isOpen={isOpen}/>
    </header>
  );
}

export default Header;
