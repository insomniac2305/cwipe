import { MainBackground } from "@/app/components/MainBackground";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { LoginForm } from "./LoginForm";
import GoogleSignInButton from "./GoogleSignInButton";

export default async function Login() {
  return (
    <MainBackground>
      <Card className="p-4">
        <CardHeader className="justify-center text-3xl font-bold">
          Login
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
        <div className="relative my-4 flex justify-center bg-inherit">
          <Divider orientation="horizontal" />
          <small className="absolute -top-4 bg-inherit p-2">
            Or continue with
          </small>
        </div>
        <CardFooter className="justify-center">
          <GoogleSignInButton />
        </CardFooter>
      </Card>
    </MainBackground>
  );
}
