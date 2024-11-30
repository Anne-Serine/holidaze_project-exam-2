import { NavLink } from "react-router-dom";

function Nav({ isOpen }) {
  return (
    <nav
      className={`absolute md:relative bg-daze-bg top-[100%] w-full pb-2  ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <ul className="container block text-center md:flex flex-wrap md:gap-8 ">
        <li className="pb-3 md:py-0 bg-daze-bg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-daze-accent bg-daze-gray p-1 px-4"
                : "hover:text-daze-accent hover:bg-daze-gray p-1 px-4"
            }
          >
            EXPLORE
          </NavLink>
        </li>
        <li className="pb-3 md:py-0 bg-daze-bg">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-daze-accent bg-daze-gray p-1 px-4"
                : "hover:text-daze-accent hover:bg-daze-gray p-1 px-4"
            }
          >
            PROFILE
          </NavLink>
        </li>
        <li className="pb-3 md:py-0 bg-daze-bg">
          <NavLink
            to="/venue/manage/"
            className={({ isActive }) =>
              isActive
                ? "text-daze-accent bg-daze-gray p-1 px-4"
                : "hover:text-daze-accent hover:bg-daze-gray p-1 px-4"
            }
          >
            NEW VENUE
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
