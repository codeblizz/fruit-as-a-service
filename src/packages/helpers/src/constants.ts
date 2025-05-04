import { Register } from "@/packages/types/src/auth.type";
import { AuthField } from "@/packages/types/src/auth.type";

const CONSTANT = {
  defaultUser: {
    email: "",
    fullName: "",
    username: "",
    profilePic: "",
    agreement: false,
    roles: {
      user: 0,
      admin: 1,
    },
    permissions: {
      user: 0,
      admin: 1,
    },
  },
  defaultLogin: { email: "", password: "" },
  getDefaultSignUp: function (): Register {
    return { ...this.defaultLogin, acceptTerms: false };
  },
  InputAuthObjects: [
    {
      type: "email",
      name: "email",
      className: "w-full",
      placeholder: "Your Email",
    },
    {
      type: "password",
      name: "password",
      className: "w-full",
      placeholder: "Your Password",
    },
    {
      type: "checkbox",
      name: "acceptTerms",
      className: "w-3 h-3",
      placeholder: "Accept Terms & Conditions",
    },
  ] as AuthField[],
};

export default CONSTANT;
