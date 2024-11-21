import { useEffect, useState } from "react";
import Button from "../common/Buttons";
import { useAuthStore } from "../../hooks/Store";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = useAuthStore((state) => state.loginUser);
  const registeredUser = useAuthStore((state) => state.registeredUser);
  const resetRegisteredUser = useAuthStore((state) => state.resetRegisteredUser);
  
  // const error = useAuthStore((state) => state.error);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  useEffect(() => {
    registeredUser.length > 0 && 
      setTimeout(() => {
        resetRegisteredUser()
      }, 5000);
  },[registeredUser, resetRegisteredUser])

  return (
    <div>
      {registeredUser.length > 0 &&
        <div>
          {registeredUser}
        </div>
      }
      <form onSubmit={handleSubmit} id="loginForm" action="post">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                pattern="^[\w\-.]+@stud\.noroff\.no$"
                title="The email must be a valid stud.noroff.no email address"
                placeholder="E.g. traveller@stud.noroff.no"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                minLength={8}
                title="The password must be at least 8 characters long"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button text="Login" />
          </form>
    </div>
  )
};

export default LoginForm;