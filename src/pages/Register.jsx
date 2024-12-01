import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";
import { useAuthStore } from "../hooks/Store";
import { useEffect } from "react";

function Register() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      window.location.href = "/";
    }
  }, [token]);

  return (
    <div className="flex">
      <div className="relative h-[100vh] w-[80vw] hidden md:block">
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
            className="my-10 md:my-28"
          />
          <h1 className="text-3xl text-center">Create account</h1>
          <RegisterForm />
          <div className="text-center p-2">
            <p>Already registered?</p>
            <Link to="/login" className="text-daze-accent underline italic">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
