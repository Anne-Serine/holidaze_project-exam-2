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
        <div className="flex flex-col items-center gap-5 max-w-[20rem]">
          <h1 className="text-3xl">Create account</h1>
          <h2 className="text-2xl mb-5">
            To book venues and be able to create new venues
          </h2>
          <form id="loginForm" action="post">
            <div>
              <label htmlFor="profileName">Profile name</label>
              <input
                type="text"
                name="profileName"
                id="profileName"
                required
                pattern="^[\w]+$"
                title="The name must not contain punctuation symbols apart from underscore (_)"
              />
            </div>
            <div>
              <label htmlFor="url">Profile picture</label>
              <input
                type="url"
                name="url"
                id="url"
                title="The link has to be a live url"
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
            <button className="pt-10">BUTTON</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
