import Fragment from "@/packages/ui/src/atoms/fragment";
import AuthForm from "@/packages/ui/src/molecules/authForm";

export default function SignIn() {
  return (
    <Fragment className="min-h-screen pt-12 w-full bg-[url('/images/fruit-platter-002.webp')] bg-no-repeat bg-cover bg-center bg-fixed flex flex-col justify-center items-center">
      {/* <Fragment className="flex items-center justify-center w-full min-h-screen backdrop-blur-[0.3rem]"> */}
        <AuthForm className="w-[60%] sm:w-[50%] min-w-max rounded-2xl" />
      {/* </Fragment> */}
    </Fragment>
  );
}
