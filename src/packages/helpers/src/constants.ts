import { Register } from "@/packages/types/src/auth.type";
import { AuthField } from "@/packages/types/src/auth.type";
import { FruitItem } from "@/packages/types/src/fruits.type";

const CONSTANT = {
  defaultCurrency: "N",
  ratingArray: [1, 2, 3, 4, 5],
  footerLabels: [
    "Copyright © 2025",
    "Sitemap",
    "Accessibility",
    "Cookie Preferences",
  ],
  Address: "201 West Lane Site Lagos, Nigeria",
  Phone: "+234 803 000 0000",
  Email: "info@fruitasaservice.com",
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
      Berries: {
        id: "berries",
        name: "Berries",
        type: ["strawberry", "raspberry", "blackberry", "cranberry"],
      },
      Citrus: {
        id: "citrus",
        name: "Citrus",
        type: ["orange", "lemon", "lime", "grapefruit", "tangerine"],
      },
      Melons: {
        id: "melons",
        name: "Melons",
        type: ["watermelon", "cantaloupe", "honeydew", "galia"],
      },
      Pomes: {
        id: "pomes",
        name: "Pomes",
        type: ["apple", "pear", "quince"],
      },
      Stones: {
        id: "stones",
        name: "Stones",
        type: ["peach", "plum", "cherry", "apricot", "nectarine"],
      },
      Tropical: {
        id: "tropical",
        name: "Tropical",
        type: ["mango", "pineapple", "banana", "papaya", "guava"],
      },
    },
  },
  fruits: [
    { id: "1", name: "Apple", price: 100, image: "🍎", unit: "kg" },
    { id: "2", name: "Banana", price: 80, image: "🍌", unit: "dozen" },
    { id: "3", name: "Orange", price: 120, image: "🍊", unit: "kg" },
    { id: "4", name: "Mango", price: 150, image: "🥭", unit: "kg" },
  ] as FruitItem[],
};

export default CONSTANT;
