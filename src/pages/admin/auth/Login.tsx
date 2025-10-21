import { LoginForm } from "@/components/login-form";

const Login = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-2xl">
          <LoginForm className="top-1/2 left-1/2 translate-y-[10%]"></LoginForm>
        </div>
      </div>
    </>
  );
};

export default Login;
