import { Register } from "@/packages/types/src/auth.type";
import { AuthField } from "@/packages/types/src/auth.type";

const CONSTANT = {
  defaultCurrency: "N",
  ratingArray: [1, 2, 3, 4, 5],
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
  fruitMenu: {
    categories: {
      "Berries": {
        id: "berries", 
        name: "Berries", 
        type: ["strawberry", "raspberry", "blackberry", "cranberry"]
      }, 
      "Citrus": {
        id: "citrus", 
        name: "Citrus", 
        type: ["orange", "lemon", "lime", "grapefruit", "tangerine"]
      }, 
      "Melons": {
        id: "melons", 
        name: "Melons", 
        type: ["watermelon", "cantaloupe", "honeydew", "galia"]
      }, 
      "Pomes": {
        id: "pomes", 
        name: "Pomes", 
        type: ["apple", "pear", "quince"]
      }, 
      "Stones": {
        id: "stones", 
        name: "Stones", 
        type: ["peach", "plum", "cherry", "apricot", "nectarine"]
      }, 
      "Tropical": {
        id: "tropical", 
        name: "Tropical", 
        type: ["mango", "pineapple", "banana", "papaya", "guava"]
      },
    },
  }
};

export default CONSTANT;
