import { useState } from "react";
import { useAuthStore } from "../../hooks/Store";
import Button from "../common/Buttons";

function RegisterForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = useAuthStore((state) => state.registerUser);
  // const error = useAuthStore((state) => state.error);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    registerUser({ name, email, password });
    setName("");
    setEmail("");
    setPassword("");
  
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="registerForm">
            <div>
              <label htmlFor="profileName">Profile name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                pattern="^[\w]+$"
                title="The name must not contain punctuation symbols apart from underscore (_)"
                placeholder="E.g. TravelerUser"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="url">Profile picture</label>
              <input
                type="url"
                name="url"
                id="url"
                title="The link has to be a live url"
                placeholder="E.g. https://img.service.com/avatar.jpg"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                pattern="^[\w\-.]+@stud\.noroff\.no$"
                title="The email must be a valid stud.noroff.no email address"
                placeholder="E.g. traveler@stud.noroff.no"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
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
            <div>
              <label htmlFor="">Confirm password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                minLength={8}
                title="The password must be at least 8 characters long"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.password)}
              />
            </div>

            {/* Consider to keep this option or not */}

            <div className="">
              <div className="flex gap-2">
                <input type="radio" name="userRadio" id="userRadio" />
                <label htmlFor="userRadio">User</label>
              </div>
              <div className="flex gap-2">
                <input type="radio" name="managerRadio" id="managerRadio" />
                <label htmlFor="managerRadio">Manager</label>
              </div>
            </div>
            <Button text="Register" />
          </form>

    </div>
  );
};

export default RegisterForm;