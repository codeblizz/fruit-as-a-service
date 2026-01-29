import Fragment from "@/packages/ui/src/atoms/fragment";
import AuthForm from "@/packages/ui/src/molecules/authForm";

export default function SignUp() {
  return (
    <Fragment className="min-h-screen pt-12 w-full flex flex-col justify-center items-center">
      {/* <Fragment className="flex items-center justify-center w-full min-h-screen backdrop-blur-[0.3rem]"> */}
        <AuthForm className="w-[60%] sm:w-[50%] h-[50%] min-w-max rounded-2xl" />
      {/* </Fragment> */}
    </Fragment>
  );
}
