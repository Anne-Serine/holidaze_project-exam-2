import { useEffect } from "react";
import Button from "../common/Buttons";
import { useAuthStore } from "../../hooks/Store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  userName: yup
    .string()
    .required("Username is required")
    .matches(
      /^[\w\-.]+@stud\.noroff\.no$/,
      "Username must be a valid stud.noroff email address"
    ),
  password: yup.string().required("Password is required").min(8),
});

function LoginForm() {
  const loginUser = useAuthStore((state) => state.loginUser);
  const registeredUser = useAuthStore((state) => state.registeredUser);
  const resetRegisteredUser = useAuthStore(
    (state) => state.resetRegisteredUser
  );
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  async function onSubmitHandler(data) {
    await loginUser({ email: data.userName, password: data.password });
  }

  useEffect(() => {
    registeredUser.length > 0 &&
      setTimeout(() => {
        resetRegisteredUser();
      }, 5000);
  }, [registeredUser, resetRegisteredUser]);

  return (
    <div className="flex flex-col justify-center">
      {registeredUser.length > 0 && <div>{registeredUser}</div>}
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        id="loginForm"
        action="post"
        className="flex flex-col items-center gap-2"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E.g. traveller@stud.noroff.no"
            {...register("userName")}
            onChange={(e) => setValue("userName", e.target.value)}
          />
          <p role="alert">{errors.userName?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            {...register("password")}
            onChange={(e) => setValue("password", e.target.value)}
          />
          <p role="alert">{errors.password?.message}</p>
        </div>
        {error && error.length > 0 && <p role="alert">{error}</p>}
        <div className="mt-5">
          <Button text="Login" onClick={() => null} />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
