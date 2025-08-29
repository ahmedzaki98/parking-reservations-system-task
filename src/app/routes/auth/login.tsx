import AuthLayout from "../../../components/layouts/auth-layout";
import LoginForm from "../../../features/auth/login-form";

export const LoginRoute = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
