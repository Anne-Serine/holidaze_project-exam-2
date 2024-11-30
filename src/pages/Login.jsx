import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { useEffect } from "react";
import { useAuthStore } from "../hooks/Store";

function Login() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      window.location.href = "/";
    } 
  }, [token])

  return (
    <div className="flex">
      <div className="relative h-[100vh] max-w-[80vw] hidden md:block">
        <img
          src="/assets/login-reg_img.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="h-[100vh] md:w-[50vw] absolute w-full right-0 bg-daze-bg flex justify-center">
        <div className="flex flex-col items-center gap-5 max-w-[15rem]">
        <img
            src="/assets/logo.svg"
            alt="Holidaze logo"
            className="my-10 md:my-32"
          />
          <h1 className="text-3xl">Login</h1>
          <LoginForm />
          <div className="text-center p-2">
            <p>
              New user?
            </p>
            <Link to="/register" className="text-daze-accent underline italic">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
