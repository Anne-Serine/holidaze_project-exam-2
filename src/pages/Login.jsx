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
        <div className="flex flex-col items-center gap-5 max-w-[20rem]">
          <h1 className="text-3xl">Login</h1>
          <h2 className="text-2xl mb-5">
            To be able to book your next adventure
          </h2>
          <form id="loginForm" action="post">
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
