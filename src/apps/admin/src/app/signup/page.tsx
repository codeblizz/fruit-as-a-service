import Fragment from "@/packages/ui/atoms/fragment";
import AuthForm from "@/packages/ui/molecules/authForm";

export default function SignUp() {
  return (
    <Fragment className="min-h-screen bg-[url('/images/fruit-platter-001.webp')] bg-no-repeat bg-cover bg-center w-full flex flex-col justify-center items-center">
      {/* <Fragment className="flex items-center justify-center w-full min-h-screen backdrop-blur-sm"> */}
        <AuthForm className="w-[60%] sm:w-[50%] md:w-[40%] h-[50%] min-w-max" />
      {/* </Fragment> */}
    </Fragment>
  );
}
