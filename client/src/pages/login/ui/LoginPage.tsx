import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/modules/auth";

const LoginPage = () => {
  const handleSuccess = () => {
    // window.location.reload();
    // window.location.href = "/home";
  };

  return (
    <div className="flex justify-center h-screen p-4 pt-[100px]">
      <div className="max-w-[350px] w-full">
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;
