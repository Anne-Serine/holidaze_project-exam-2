import { useAuthStore } from "../../hooks/Store";
import Button from "../common/Buttons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  profileName: yup
    .string()
    .required("Profile name is required")
    .matches(
      /^[\w]+$/,
      "The name must not contain punctuation symbols apart from underscore (_)"
    ),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[\w\-.]+@stud\.noroff\.no$/,
      "Email must be a valid stud.noroff email address"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function RegisterForm() {
  const registerUser = useAuthStore((state) => state.registerUser);
  const error = useAuthStore((state) => state.error);

  const onSubmitHandler = (data) => {
    if (data.password !== data.confirmPassword) {
      return "Passwords don´t match";
    }
    registerUser({
      name: data.profileName,
      email: data.email,
      password: data.password,
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        id="registerForm"
        className="flex flex-col items-center gap-2"
      >
        <div>
          <label htmlFor="profileName">Profile name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="E.g. TravelerUser"
            {...register("profileName")}
            onChange={(e) => setValue("profileName", e.target.value)}
          />
          <p role="alert">{errors.profileName?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E.g. traveler@stud.noroff.no"
            {...register("email")}
            onChange={(e) => setValue("email", e.target.value)}
          />
          <p role="alert">{errors.email?.message}</p>
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
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            {...register("confirmPassword")}
            onChange={(e) => setValue("confirmPassword", e.target.value)}
          />
          <p role="alert">{errors.confirmPassword?.message}</p>
        </div>
        {error && error.length > 0 && <p role="alert">{error}</p>}
        <div className="mt-5">
          <Button text="Register" onClick={() => null} />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
