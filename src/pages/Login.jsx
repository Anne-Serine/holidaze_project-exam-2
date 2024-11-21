import LoginForm from "../components/forms/LoginForm";

function Login() {
  return (
    <div className="flex">
      <div className="relative h-[100vh] w-[80vw]">
        <img
          src="/assets/login-reg_img.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="h-[100vh] w-[50vw] absolute right-0 bg-daze-bg asymatrical-right flex items-center justify-center">
        <div className="flex flex-col items-center gap-5 max-w-[15rem]">
          <h1 className="text-3xl">Login</h1>
          <h2 className="text-xl mb-5">
            To be able to book your next adventure
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
