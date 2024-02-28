import { MainBackground } from "@/app/components/MainBackground";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa6";

export default async function Login() {
  return (
    <MainBackground>
      <Card className="p-4">
        <CardHeader className="justify-center text-3xl font-bold">
          Login
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input label="Name" id="name"></Input>
            <Button type="submit" color="primary">
              Get started
            </Button>
          </form>
        </CardBody>
        <div className="relative mb-4 mt-8 flex justify-center bg-inherit">
          <Divider orientation="horizontal" />
          <small className="absolute -top-4 bg-inherit p-2">
            Or sign in via
          </small>
        </div>
        <CardFooter className="justify-center gap-2">
          <Button isIconOnly className="text-xl">
            <FaApple />
          </Button>
          <Button isIconOnly className="text-xl">
            <FaGoogle />
          </Button>
          <Button isIconOnly className="text-xl">
            <FaFacebook />
          </Button>
        </CardFooter>
      </Card>
    </MainBackground>
  );
}
