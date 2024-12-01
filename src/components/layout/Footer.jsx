import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer bg-daze-gray">
      <div className="container flex flex-col items-center gap-5 text-daze-white">
        <Link to="/">
          <img src="/assets/logo-light.svg" className="" alt="Holidaze logo" />
        </Link>
        <ul className="block text-center md:flex flex-wrap md:gap-5">
          <li className="pb-2">
            <Link to="/">EXPLORE</Link>
          </li>
          <li className="pb-2">
            <Link to="/profile">PROFILE</Link>
          </li>
          <li className="pb-2">
            <Link to="/venue/manage">NEW VENUE</Link>
          </li>
        </ul>
        <hr className="mt-8 w-full" />
        <div className="flex gap-3">
          <img src="/assets/twitter.svg" alt="twitter logo" />
          <img src="/assets/facebook.svg" alt="facebook logo" />
          <img src="/assets/instagram.svg" alt="instagram logo" />
        </div>
        <div className="text-center mt-3 text-xs">
          <p>2024 &copy; Anne-Serine Johannessen</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
