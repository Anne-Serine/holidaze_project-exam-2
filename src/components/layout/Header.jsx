import { Link } from "react-router-dom";
import Nav from "./Nav";
import { Menu, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/Store";
import Button from "../common/Buttons";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const token = useAuthStore((state) => state.token);

  const closeMenu = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

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
      <div className="container flex flex-wrap justify-between items-center">
        <Link to="/" className="min-scale-75 scale-75 sm:scale-100">
          <img src="/assets/logo.svg" alt="Holidaze logo" />
        </Link>
        <div className="flex gap-5 w-full sm:max-w-max justify-end">
          <div className="flex flex-col items-center">
            <Button
              text={token ? "Logout" : "Login"}
              type="tertiary"
              onClick={logoutUser}
              icon={<UserRound size={22} />}
            />
          </div>
          <div className="flex order-1 w-auto md:hidden">
            <Button
              type="tertiary"
              onClick={() => setIsOpen(!isOpen)}
              icon={<Menu size={22} />}
            />
          </div>
        </div>
      </div>
      <Nav isOpen={isOpen} closeMenu={closeMenu} />
    </header>
  );
}

export default Header;
