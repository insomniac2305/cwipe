import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { MainBackground } from "@/app/components/MainBackground";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { BrandLogo } from "@/app/components/Brand";
import LoginForm from "@/app/login/components/LoginForm";

export default async function Login() {
  return (
    <main>
      <MainBackground>
        <Card className="max-w-xs p-4">
          <CardHeader className="justify-center px-10">
            <BrandLogo />
          </CardHeader>
          <CardBody>
            <p className="mb-4 text-center">
              Jump right in to find a movie you want to watch together
            </p>
            <LoginForm />
          </CardBody>
          <div className="relative my-4 flex justify-center bg-inherit">
            <Divider orientation="horizontal" />
            <small className="absolute -top-4 bg-inherit p-2">
              Or sign in to an account
            </small>
          </div>
          <CardFooter className="justify-center">
            <GoogleSignInButton />
          </CardFooter>
        </Card>
      </MainBackground>
    </main>
  );
}
