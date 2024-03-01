import { MainBackground } from "@/app/components/MainBackground";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { FaApple, FaFacebook } from "react-icons/fa6";
import { LoginForm } from "./LoginForm";
import { FcGoogle } from "react-icons/fc";

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
        <div className="relative mb-4 mt-8 flex justify-center bg-inherit">
          <Divider orientation="horizontal" />
          <small className="absolute -top-4 bg-inherit p-2">
            Or sign in via
          </small>
        </div>
        <CardFooter className="justify-center gap-3">
          <Button
            isIconOnly
            className="bg-white text-2xl text-[#080808]"
            aria-description="Apple"
          >
            <FaApple />
          </Button>
          <Button
            isIconOnly
            className="bg-white text-2xl"
            aria-description="Google"
          >
            <FcGoogle />
          </Button>
          <Button
            isIconOnly
            className="bg-white text-2xl text-[#1877F2]"
            aria-description="Facebook"
          >
            <FaFacebook />
          </Button>
        </CardFooter>
      </Card>
    </MainBackground>
  );
}
