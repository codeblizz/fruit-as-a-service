import { Register } from "@/packages/types/src/auth.type";
import { AuthField } from "@/packages/types/src/auth.type";
import { Store, Truck, Hotel, Factory } from "lucide-react";
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
  Address: "201 West Lane Lagos, Nigeria",
  Phone: "+234 803 000 0000",
  Email: "info@fruitasaservice.com",
  subscriptionPlans: [
    {
      id: "basic",
      name: "Basic Box",
      price: 2500, // $25/month
      description: "Perfect for individuals",
      features: [
        "5 seasonal fruits",
        "Weekly delivery",
        "Basic fruit guide",
        "Email support",
      ],
      image: "🍎",
    },
    {
      id: "family",
      name: "Family Box",
      price: 4500, // $45/month
      description: "Great for families",
      features: [
        "10 seasonal fruits",
        "Weekly delivery",
        "Premium fruit guide",
        "Priority support",
        "Customization options",
      ],
      image: "🍎🍐",
    },
    {
      id: "premium",
      name: "Premium Box",
      price: 6500, // $65/month
      description: "Ultimate fruit experience",
      features: [
        "15 exotic fruits",
        "Weekly delivery",
        "Expert fruit guide",
        "24/7 support",
        "Full customization",
        "Special seasonal items",
      ],
      image: "🍎🍐🥝",
    },
  ],
  testimonials: [
    {
      name: "Jane M., Lagos",
      image: "https://via.placeholder.com/150",
      text: "I absolutely love shopping here! The staff are always friendly and helpful, and the quality of the products is outstanding. I found exactly what I needed, and the prices were very reasonable. Highly recommend!",
    },
    {
      name: "Ahmed O., Ojo",
      image: "https://via.placeholder.com/150",
      text: "I've been shopping here for years, and the quality never disappoints. The staff is always helpful, and the prices are competitive. I highly recommend this store to anyone looking for quality products at great prices.",
    },
    {
      name: "Chinwe A., Lagos",
      image: "https://via.placeholder.com/150",
      text: "This software has transformed the way we manage our projects. It's user-friendly, efficient, and the customer support is top-notch. Our productivity has increased significantly since we started using it.",
    },
    {
      name: "Tunde L., Lagos",
      image: "https://via.placeholder.com/150",
      text: "The team did an amazing job cleaning my home. They were punctual, professional, and paid great attention to detail. My house has never looked better! I will definitely be using their services again.",
    },
  ],
  partnerHighLightDetails: [
    {
      icon: Store,
      title: "Retailers",
      desc: "Daily delivery of quality fresh fruits & vegetables at best prices to Small Enterprises. We go extra mile to offer you the best selection of local & global produce. More happy customer. More income.",
    },
    {
      icon: Factory,
      title: "Food Processing",
      desc: "We offer right price & price hedging mechanism to suit your unique quality norms & delivery schedule. We arrange pre-season buyer-farmer meetings, dedicate farms to take up crop plan, extend regular guidance, offer you digital visibility of the of crop and delivery status.",
    },
    {
      icon: Truck,
      title: "Exporters",
      desc: "We identify best source to suit your bulk requirement across our registered farms on pan India level. We ensure total process compliance on quality, packing & handling so as to deliver as per the contract.",
    },
    {
      icon: Hotel,
      title: "Hotels/Kitchens",
      desc: "Leave your sourcing worries to us & reap the benefits of our Dynamic Source Optimization module. We identify best source offering lowest prices in sync with your daily demand. You save money by optimizing purchase prices, inventory & overhead cost. We also help you with market price feeds & outlook so as to help you plan your purchases efficiently.",
    },
  ],
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
