import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/form/input";
import { Button } from "../../components/ui/button";
import {
  loginInputSchema,
  useLogin,
  type loginInputSchema as loginType,
} from "../../lib/auth";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

type LoginFormValues = z.infer<typeof loginType>;

const LoginForm = () => {
      const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginInputSchema),
  });

  const login = useLogin({
    onSuccess: () => {
      navigate('/app/dashboard', {
        replace: true,
      });
    },
  });
  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Card className="w-2/5">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your user name and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <label htmlFor="email">Username</label>
                <Input
                  id="username"
                  type="text"
                  placeholder="m@example.com"
                  registration={register("username")}
                  error={errors.username}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <label htmlFor="password">Password</label>
                </div>
                <Input
                  id="password"
                  type="password"
                  registration={register("password")}
                  error={errors.password}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full border-0!"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
