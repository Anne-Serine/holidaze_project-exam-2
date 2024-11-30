import RegisterForm from "../components/forms/RegisterForm";

function Register() {
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
        <div className="flex flex-col items-center gap-5 max-w-[10rem]">
          <h1 className="text-3xl">Create account</h1>
          <h2 className="text-2xl mb-5">
            To book venues and be able to create new venues
          </h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
