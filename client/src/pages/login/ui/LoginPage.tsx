import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/features/login";
import TestForm from "@/pages/login/ui/TestForm.tsx";

const LoginPage = () => {
  const navigate = useNavigate();

  // return <TestForm />;
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="max-w-[350px] w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
