import {
  SignUp,
  EmailType,
  IEmailConfigItem,
} from "@/packages/types/src/auth.type";
import { AppUser } from "@/packages/types/src/user.type";
import { AuthField } from "@/packages/types/src/auth.type";
import { IFruitItem } from "@/packages/types/src/fruits.type";
import { FruitFormData } from "./validations/fruits.validate";
// import {
//   XIcon,
//   FacebookIcon,
//   LinkedInIcon,
//   InstagramIcon,
//   GoogleDarkIcon,
// } from "@/packages/assets/icons";
import {
  Store,
  Truck,
  UserIcon,
  TruckIcon,
  ShieldCheckIcon,
  Hotel,
  Factory,
  Lock,
  ShoppingCartIcon,
  Bell,
  Users,
  Wallet,
  PieChart,
  Settings,
  Calendar,
  HelpCircle,
  TrendingUp,
  LayoutDashboard,
  Leaf,
  Tag,
  Sprout,
  ArrowDownRight,
  Target,
  Clock,
} from "lucide-react";

const CONSTANT = {
  defaultCurrency: "N",
  defaultLocale: "en-NG",
  defaultCurrencyName: "NGN",
  ADD_FRUIT_MIN_IMAGES: 4,
  ratingArray: [1, 2, 3, 4, 5],
  VERIFICATION_CODE_LENGTH: 6,
  BATCH_NUMBER_REGEX: /^BN-\d{4}-[A-Z]{3}-[A-Z0-9]{3}$/,
  footerLabels: [
    "Copyright © 2025",
    "Sitemap",
    "Accessibility",
    "Cookie Preferences",
  ],
  unProtectedPages: [
    "/",
    "/utilities",
    "/auth/signin",
    "/auth/signup",
    "/membership",
    "/support/faq",
    "/how-it-works",
    "/auth/email-sent",
    "/auth/reset-password",
    "/auth/forgot-password",
    "/support/contact-us",
    "/support/membership",
    "/support/privacy-policy",
    "/support/terms-of-service",
  ],
  Address: "201 West Lane Lagos, Nigeria",
  Phone: "+234 803 000 0000",
  Email: "info@fruitasaservice.com",
  MOCK_CATEGORIES: [
    { id: 1, name: "Citrus" },
    { id: 2, name: "Berries" },
    { id: 3, name: "Tropicals" },
    { id: 4, name: "Pomes" },
    { id: 4, name: "Stones" },
    { id: 4, name: "Melons" },
  ],
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
    firstName: "",
    lastName: "",
    businessName: "",
    isActive: false,
    isVerified: false,
    profileImageUrl: "",
    termsAccepted: false,
    roles: [""],
    permissions: [""],
    [Symbol.toStringTag]: "DefaultUser",
    *[Symbol.iterator](): IterableIterator<[keyof AppUser, any]> {
      const keys = Object.keys(this) as Array<keyof AppUser>;
      for (const key of keys) {
        yield [key, this[key]];
      }
    },
  },
  defaultLogin: { email: "", password: "" },
  getDefaultSignUp: function (): SignUp {
    return {
      ...this.defaultLogin,
      firstName: "",
      lastName: "",
      businessName: "",
      termsAccepted: false,
    };
  },
  InputAuthObjects: [
    {
      type: "text",
      name: "firstName",
      className: "w-full",
      placeholder: "Your First Name",
    },
    {
      type: "text",
      name: "lastName",
      className: "w-full",
      placeholder: "Your Last Name",
    },
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
      type: "text",
      name: "businessName",
      className: "w-full",
      placeholder: "Your Business Name",
    },
    {
      type: "checkbox",
      name: "termsAccepted",
      className: "w-3 h-3",
      placeholder: "Accept Terms & Conditions",
    },
  ] as AuthField[],
  menuItems: [
    {
      id: "overview",
      hasSubItems: false,
      path: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      permission: "READ_FRUITS",
    },
    {
      id: "profile",
      hasSubItems: false,
      label: "Profile",
      path: "/dashboard/profile",
      icon: Users,
      permission: "READ_PROFILE",
    },
    {
      id: "manage-fruits",
      hasSubItems: true,
      label: "Manage Fruits",
      path: "/dashboard/fruits",
      icon: ShoppingCartIcon,
      permission: "WRITE_FRUITS",
    },
    {
      id: "analytics",
      hasSubItems: false,
      label: "Analytics",
      path: "/dashboard/analytics",
      icon: PieChart,
      permission: "READ_FRUITS",
    },
    {
      id: "transactions",
      hasSubItems: false,
      label: "Transactions",
      path: "/dashboard/transactions",
      icon: Wallet,
      permission: "READ_FRUITS",
    },
    {
      id: "schedule",
      hasSubItems: false,
      label: "Schedule",
      path: "/dashboard/schedule",
      icon: Calendar,
      permission: "READ_FRUITS",
    },
    {
      id: "performance",
      hasSubItems: false,
      label: "Performance",
      path: "/dashboard/performance",
      icon: TrendingUp,
      permission: "READ_FRUITS",
    },
  ],
  secondaryItems: [
    { id: "settings", hasSubItems: false, label: "Settings", icon: Settings },
    {
      id: "help-center",
      hasSubItems: false,
      label: "Help Center",
      icon: HelpCircle,
    },
  ],
  fruitMenu: {
    categories: {
      Berries: {
        id: "berries",
        name: "Berries",
        // icon: Berries,
        kinds: ["strawberry", "raspberry", "blackberry", "cranberry"],
      },
      Citrus: {
        id: "citrus",
        name: "Citrus",
        // icon: Citrus,
        kinds: ["orange", "lemon", "lime", "grapefruit", "tangerine"],
      },
      Melons: {
        id: "melons",
        name: "Melons",
        // icon: Melons,
        kinds: ["watermelon", "cantaloupe", "honeydew", "galia"],
      },
      Pomes: {
        id: "pomes",
        name: "Pomes",
        // icon: Pomes,
        kinds: ["apple", "pear", "quince"],
      },
      Stones: {
        id: "stones",
        name: "Stones",
        // icon: Stones,
        kinds: ["peach", "plum", "cherry", "apricot", "nectarine"],
      },
      Tropical: {
        id: "tropical",
        name: "Tropical",
        // icon: Tropical,
        kinds: ["mango", "pineapple", "banana", "papaya", "guava"],
      },
    },
  },
  formInputFruitDetails: [
    {
      id: "commonName",
      label: "Common Name",
      placeholder: "e.g., Gala Apple",
      icon: Tag,
      type: "text",
    },
    {
      id: "botanicalName",
      label: "Botanical Name",
      placeholder: "e.g., Malus domestica",
      icon: Leaf,
      type: "text",
    },
    {
      id: "unitPrice",
      label: "Price PerUnit (NGN)",
      placeholder: "e.g., 2.99",
      icon: Leaf,
      type: "text",
    },
    {
      id: "currentStock",
      label: "Stock Quantity",
      placeholder: "e.g., 150",
      icon: Leaf,
      type: "text",
    },
    {
      id: "harvestDate",
      label: "Harvest Date",
      placeholder: "Select Harvest Date",
      icon: Calendar,
      type: "date",
    },
    {
      id: "expiryDate",
      label: "Expiry Date",
      placeholder: "Select Expiry Date",
      icon: Calendar,
      type: "date",
    },
    {
      id: "supplier",
      label: "Supplier Name",
      placeholder: "e.g., Fresh Farms Ltd.",
      icon: Users,
      type: "text",
    },
    {
      id: "batchNumber",
      label: "Batch Number",
      placeholder: "e.g., BN-2023-XYZ-001",
      icon: Lock,
      type: "text",
    },
  ],
  fruits: [
    { id: "1", name: "Apple", price: 100, image: "🍎", unit: "kg" },
    { id: "2", name: "Banana", price: 80, image: "🍌", unit: "dozen" },
    { id: "3", name: "Orange", price: 120, image: "🍊", unit: "kg" },
    { id: "4", name: "Mango", price: 150, image: "🥭", unit: "kg" },
  ] as IFruitItem[],
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  PAYMENT_STATUSES: {
    PENDING: "pending",
    PROCESSING: "processing",
    COMPLETED: "completed",
    FAILED: "failed",
    REFUNDED: "refunded",
    CANCELLED: "cancelled",
  },
  CURRENCIES: {
    USD: "USD",
    EUR: "EUR",
    GBP: "GBP",
    NGN: "NGN",
    ZAR: "ZAR",
  },
  priceCardDetails: [
    {
      price: 450,
      rating: 3,
      index: "001",
      title: "2kg Strawberry-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-001.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 280,
      rating: 4,
      index: "002",
      title: "1kg Banana-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-002.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 750,
      rating: 2,
      index: "003",
      title: "5kg Raspberry-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-003.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 550,
      rating: 4,
      index: "004",
      title: "3kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-004.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 4,
      index: "005",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-005.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 2,
      index: "006",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-003.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 3,
      index: "007",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-002.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 4,
      index: "008",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-001.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 3,
      index: "009",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-004.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 2,
      index: "010",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-005.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 2,
      index: "011",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-002.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 4,
      index: "012",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-001.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 3,
      index: "013",
      title: "2kg Orange-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-003.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 850,
      rating: 3,
      index: "014",
      title: "2kg Fig-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-004.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 550,
      rating: 2,
      index: "015",
      title: "2kg Lemon-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-005.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 2,
      index: "016",
      title: "2kg Lime-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-002.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 2,
      index: "017",
      title: "2kg Pineapple-US",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-003.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 2,
      index: "018",
      title: "2kg Plum-SA",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-001.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 2,
      index: "019",
      title: "2kg Mango-MEX",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-005.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
    {
      price: 450,
      rating: 2,
      index: "020",
      title: "2kg Apple-IND",
      sellerName: "Simpson Global Inc.",
      image: "/images/fruit-platter-004.webp",
      description:
        "A distribution company that specializes in fresh produce and quality fruits.",
    },
  ],
  navigationItems: [
    { name: "Home", href: "/", icon: null },
    {
      name: "Shop Fruits",
      href: "/fruits/buyer",
      icon: ShoppingCartIcon,
    },
    { name: "Sell Fruits", href: "/fruits/seller", icon: null },
    { name: "Dashboard", href: "/dashboard", icon: null },
    { name: "About", href: "/about", icon: null },
    { name: "Contact", href: "/contact", icon: null },
    { name: "FAQ", href: "/faqs", icon: null },
  ],
  faqData: {
    'Delivery': [
      {
        question: "How long does delivery take?",
        answer: "We pride ourselves on 'Field-to-Fridge' speed. Most orders placed before 2 PM are delivered within 24-48 hours. During peak harvest seasons, some specialty items may take an additional day to ensure they are picked at perfect ripeness."
      },
      {
        question: "Do you deliver to my area?",
        answer: "Currently, we serve most major metropolitan areas and their surrounding suburbs. You can enter your zip code at the top of our Market page to verify specific delivery availability for your neighborhood."
      },
      {
        question: "Can I track my harvest in real-time?",
        answer: "Absolutely. Once your order leaves the farm, you'll receive a tracking link via SMS. You can see your driver's progress and an estimated arrival window accurate to within 15 minutes."
      }
    ],
    'Refunds': [
      {
        question: "What is your refund policy for perishables?",
        answer: "Our 'Freshness Guarantee' means if any item arrives bruised, wilted, or below your expectations, we will issue a full credit or refund immediately. Just snap a photo within 24 hours of delivery and upload it via the app."
      },
      {
        question: "How long do refunds take to process?",
        answer: "Store credits are instant. If you prefer a refund to your original payment method, it typically appears on your statement within 3-5 business days depending on your bank."
      }
    ],
    'Bulk Orders': [
      {
        question: "Do you offer wholesale or bulk pricing?",
        answer: "Yes! For restaurants, catering services, or large events, we offer bulk tiers. Orders exceeding $500 qualify for a dedicated account manager and volume discounts ranging from 10% to 25%."
      },
      {
        question: "How do I place a bulk order for an event?",
        answer: "Navigate to our 'Bulk & Wholesale' portal or contact our concierge team. We recommend placing event orders at least 7 days in advance to ensure the farm can reserve the necessary harvest volume."
      }
    ]
  } as any,
  features: [
    {
      icon: ShoppingCartIcon,
      title: "Premium Quality",
      description: "Farm-fresh fruits delivered to your doorstep",
      color: "from-apple-green to-kiwi",
    },
    {
      icon: TruckIcon,
      title: "Fast Delivery",
      description: "Same-day delivery in most areas",
      color: "from-orange to-mango",
    },
    {
      icon: ShieldCheckIcon,
      title: "Guaranteed Fresh",
      description: "100% satisfaction guarantee or money back",
      color: "from-strawberry to-cherry",
    },
    {
      icon: UserIcon,
      title: "Community Driven",
      description: "Supporting local farmers and communities",
      color: "from-grape-purple to-plum",
    },
  ],
  testimonialsB: [
    {
      name: "Sarah Johnson",
      review:
        "The freshest fruits I've ever ordered online! Amazing quality and service.",
      rating: 5,
      fruit: "🍓",
    },
    {
      name: "Mike Chen",
      review: "Fast delivery and great prices. My family loves the variety!",
      rating: 5,
      fruit: "🥭",
    },
    {
      name: "Emma Davis",
      review:
        "Perfect for my smoothie business. Consistent quality every time.",
      rating: 5,
      fruit: "🍌",
    },
    {
      name: "Jane M., Lagos",
      fruit: "🍎",
      rating: 5,
      review:
        "I absolutely love shopping here! The staff are always friendly and helpful, and the quality of the products is outstanding. I found exactly what I needed, and the prices were very reasonable. Highly recommend!",
    },
    {
      name: "Ahmed O., Ojo",
      fruit: "🍐",
      rating: 5,
      review:
        "I've been shopping here for years, and the quality never disappoints. The staff is always helpful, and the prices are competitive. I highly recommend this store to anyone looking for quality products at great prices.",
    },
    {
      name: "Chinwe A., Lagos",
      fruit: "🥭",
      rating: 5,
      review:
        "This software has transformed the way we manage our projects. It's user-friendly, efficient, and the customer support is top-notch. Our productivity has increased significantly since we started using it.",
    },
    {
      name: "Tunde L., Lagos",
      fruit: "🥝",
      rating: 5,
      review:
        "The team did an amazing job cleaning my home. They were punctual, professional, and paid great attention to detail. My house has never looked better! I will definitely be using their services again.",
    },
  ],
  footerLinks: {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    products: [
      { name: "Fresh Fruits", href: "/fruits/buyer" },
      { name: "Organic Selection", href: "/organic" },
      { name: "Fruit Boxes", href: "/boxes" },
      { name: "Business Solutions", href: "/business" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "FAQ", href: "/faq" },
    ],
    sellers: [
      { name: "Become a Seller", href: "/fruits/seller" },
      { name: "Seller Resources", href: "/seller-resources" },
      { name: "Seller Support", href: "/seller-support" },
      { name: "Partner Program", href: "/partners" },
      { name: "Wholesale", href: "/wholesale" },
    ],
  },
  footerItems: {
    services: [
      {
        pathUrl: "/auth/signup",
        name: "Community Backed Funding",
      },
      {
        pathUrl: "/electricity-bills",
        name: "Electricity Bills",
      },
      {
        pathUrl: "/cable-tV",
        name: "Cable TV",
      },
      {
        pathUrl: "/mobile-recharge",
        name: "Mobile Recharge",
      },
      {
        pathUrl: "/career",
        name: "Career",
      },
    ],
    support: [
      {
        pathUrl: "/about-us",
        name: "About Us",
      },
      {
        pathUrl: "/support/contact-us",
        name: "Contact Us",
      },
      {
        pathUrl: "/how-it-works",
        name: "How It Works",
      },
      {
        pathUrl: "/support/privacy-policy",
        name: "Privacy Policy",
      },
      {
        pathUrl: "/support/membership",
        name: "Become a Member",
      },
      {
        pathUrl: "/support/terms-of-service",
        name: "Terms of Service",
      },
      {
        pathUrl: "/support/faq",
        name: "FAQ",
      },
    ],
    // contacts: [
    //   {
    //     icon: ArroRightUpIcon,
    //     name: "Address: Lagos, Nigeria",
    //   },
    //   {
    //     name: "Email: support@paysmilenow.com",
    //     icon: EnvelopIcon,
    //   },
    //   {
    //     icon: TelephoneIcon,
    //     name: "Phone: +234 123 456 7890",
    //   },
    //   {
    //     icon: ClockIcon,
    //     name: "Mon-Fri: 9AM-5PM GMT+1",
    //   },
    // ],
  },
  // socialIcons: [
  // {
  //   id: "facebook",
  //   name: "Facebook",
  //   icon: FacebookIcon,
  //   href: "https://www.facebook.com/paysmilenow",
  // },
  // {
  //   id: "x",
  //   name: "X",
  //   icon: XIcon,
  //   href: "https://www.x.com/paysmilenow",
  // },
  // {
  //   id: "google",
  //   name: "Google",
  //   icon: GoogleDarkIcon,
  //   href: "https://www.google.com/paysmilenow",
  // },
  // {
  //   id: "instagram",
  //   name: "Instagram",
  //   icon: InstagramIcon,
  //   href: "https://www.instagram.com/paysmilenow",
  // },
  // {
  //   id: "linkedin",
  //   name: "LinkedIn",
  //   icon: LinkedInIcon,
  //   href: "https://www.linkedin.com/company/paysmilenow",
  // },
  popularFruits: [
    {
      name: "Strawberries",
      emoji: "🍓",
      color: "from-strawberry to-cherry",
    },
    {
      name: "Oranges",
      emoji: "🍊",
      color: "from-orange to-cantaloupe",
    },
    { name: "Bananas", emoji: "🍌", color: "from-banana to-lemon" },
    {
      name: "Apples",
      emoji: "🍎",
      color: "from-apple-red to-pomegranate",
    },
    {
      name: "Grapes",
      emoji: "🍇",
      color: "from-grape-purple to-plum",
    },
    { name: "Mangoes", emoji: "🥭", color: "from-mango to-papaya" },
  ],
  EMAIL_SENT_CONFIG: {
    VERIFICATION: {
      icon: Lock,
      title: "Account Verification Sent",
      description:
        "We successfully sent a verification link and code to your email. Check your inbox to complete your sign-up.",
      nextSteps: [
        "Click the link in the email for instant verification.",
        "Alternatively, copy the 6-digit code and enter it manually on the verification page.",
      ],
      ctaText: "Continue to Verification Page",
      ctaLink: "/auth/verify",
      secondaryLinkText: "Didn't receive the code? Resend Email",
      secondaryLinkAction: () =>
        console.log("Resend verification email triggered."),
    },
    PASSWORD_RESET: {
      icon: Lock,
      title: "Password Reset Email Sent",
      description:
        "We have sent instructions to reset your password to your email address.",
      nextSteps: [
        "Click the secure link in the email to set a new password.",
        "The link is valid for 1 hour.",
      ],
      ctaText: "Continue to Sign In",
      ctaLink: "/auth/signin",
      secondaryLinkText: "Trouble finding the email?",
      secondaryLinkAction: () => console.log("Open Mail App action triggered."),
    },
    NOTIFICATION: {
      icon: Bell,
      title: "Notification Email Sent",
      description:
        "A summary of recent activity has been sent to your email address.",
      nextSteps: [
        "Open your inbox to view the full details of your recent notification.",
      ],
      ctaText: "Go to Dashboard",
      ctaLink: "/dashboard",
      secondaryLinkText: "Manage Notification Settings",
      secondaryLinkAction: () =>
        console.log("Redirect to notification settings."),
    },
  } as unknown as Record<EmailType, IEmailConfigItem>,
  defaultFruitValues: {
    botanicalName: "",
    commonName: "",
    originCountry: "",
    description: "",
    images: [],
    unitPrice: "0.00",
    currentStock: "0",
    categoryName: "",
    harvestDate: "",
    expiryDate: "",
    supplier: "",
    batchNumber: "BN-2023-XYZ-0B9",
    [Symbol.toStringTag]: "DefaultFruitValues",
    // *[Symbol.iterator](): IterableIterator<[keyof FruitFormData, any]> {
    //   const keys = Object.keys(this) as Array<keyof FruitFormData>;
    //   for (const key of keys) {
    //     yield [key, (this as any)[key]];
    //   }
    // },
    // [Symbol.iterator](): Iterator<[keyof FruitFormData, any]> {
    //   const keys = Object.keys(this).filter(
    //     (key) =>
    //       typeof (this as any)[key] !== "function" &&
    //       key !== Symbol.toStringTag.toString()
    //   ) as Array<keyof FruitFormData>;
    //   let index = 0;
    //   return {
    //     next: (): IteratorResult<[keyof FruitFormData, any]> => {
    //       if (index < keys.length) {
    //         const key = keys[index++];
    //         const value = (this as any)[key];

    //         return {
    //           value: [key, value],
    //           done: false,
    //         };
    //       } else {
    //         return {
    //           value: undefined as any,
    //           done: true,
    //         };
    //       }
    //     },
    //   };
    // },
  },
  sampleAddFruits: {
    botanicalName: "Malus domestica",
    commonName: "Honeycrisp Apple",
    originCountry: "USA",
    description: "Premium crunchy and sweet apples from the autumn harvest.",
    categoryName: "Pomes",
    unitPrice: 2.5,
    currentStock: 100,
    harvestDate: "2023-10-01",
    expiryDate: "2023-11-01",
    supplier: "Northwest Orchard Co.",
  },
  sampleAddFruits2: {
    botanicalName: "Mangifera indica",
    commonName: "Alphonso Mango",
    originCountry: "India",
    description:
      "Known as the King of Mangoes, these are incredibly rich, creamy, and non-fibrous.",
    categoryName: "Tropical",
    unitPrice: 4.75,
    currentStock: 50,
    harvestDate: "2024-03-15",
    expiryDate: "2024-04-10",
    supplier: "Ratnagiri Farms Ltd.",
  },
  sampleAddFruits3: {
    botanicalName: "Fragaria × ananassa",
    commonName: "Jubilee Strawberry",
    originCountry: "Spain",
    description:
      "Premium sweet strawberries, hand-picked for uniform size and deep red color.",
    categoryName: "Berries",
    unitPrice: 3.25,
    currentStock: 200,
    harvestDate: "2024-05-01",
    expiryDate: "2024-05-12",
    supplier: "Huelva Sun Growers",
  },
  salesData: [
    { name: "Mon", sales: 400, spoilage: 24 },
    { name: "Tue", sales: 300, spoilage: 13 },
    { name: "Wed", sales: 600, spoilage: 98 },
    { name: "Thu", sales: 800, spoilage: 39 },
    { name: "Fri", sales: 500, spoilage: 48 },
    { name: "Sat", sales: 900, spoilage: 38 },
    { name: "Sun", sales: 700, spoilage: 43 },
  ],
  categoryData: [
    { name: "Citrus", value: 45, color: "#f59e0b" },
    { name: "Berries", value: 30, color: "#8b5cf6" },
    { name: "Stone Fruit", value: 15, color: "#ef4444" },
    { name: "Tropical", value: 10, color: "#10b981" },
  ],
  activityData: [
    { day: "Mon", activity: 20 },
    { day: "Tue", activity: 45 },
    { day: "Wed", activity: 30 },
    { day: "Thu", activity: 70 },
    { day: "Fri", activity: 40 },
    { day: "Sat", activity: 85 },
    { day: "Sun", activity: 60 },
  ],
  transactionData: [
    {
      id: "TRX-9821",
      date: "2023-10-24",
      entity: "Apple Store",
      category: "Technology",
      amount: -1299.0,
      status: "Completed",
      method: "Visa **** 4242",
    },
    {
      id: "TRX-9822",
      date: "2023-10-23",
      entity: "Stripe Payout",
      category: "Income",
      amount: 4500.5,
      status: "Completed",
      method: "Bank Transfer",
    },
    {
      id: "TRX-9823",
      date: "2023-10-23",
      entity: "Amazon Web Services",
      category: "Cloud Hosting",
      amount: -340.25,
      status: "Pending",
      method: "MasterCard **** 8812",
    },
    {
      id: "TRX-9824",
      date: "2023-10-22",
      entity: "Fresh Produce Logistics",
      category: "Operations",
      amount: -850.0,
      status: "Completed",
      method: "Visa **** 4242",
    },
    {
      id: "TRX-9825",
      date: "2023-10-21",
      entity: "Sarah Jenkins",
      category: "Refund",
      amount: 120.0,
      status: "Failed",
      method: "PayPal",
    },
    {
      id: "TRX-9826",
      date: "2023-10-21",
      entity: "Figma Subscription",
      category: "Software",
      amount: -15.0,
      status: "Completed",
      method: "Visa **** 4242",
    },
    {
      id: "TRX-9827",
      date: "2023-10-20",
      entity: "Internal Transfer",
      category: "Transfer",
      amount: -500.0,
      status: "Completed",
      method: "Savings Account",
    },
    {
      id: "TRX-9828",
      date: "2023-10-20",
      entity: "Client: Fruitly HK",
      category: "Income",
      amount: 12400.0,
      status: "Completed",
      method: "Wire Transfer",
    },
  ],
  calendarEvents: [
    {
      day: 2,
      type: "harvest",
      title: "Honeycrisp Harvest",
      location: "Sector A-14",
      color: "bg-orange-500",
    },
    {
      day: 4,
      type: "delivery",
      title: "Supply Re-stock",
      location: "Main Gate",
      color: "bg-emerald-600",
    },
    {
      day: 6,
      type: "alert",
      title: "Temp Spike",
      location: "Bay 4",
      color: "bg-red-500",
    },
    {
      day: 7,
      type: "harvest",
      title: "Gala Picking",
      location: "Sector B-02",
      color: "bg-orange-500",
    },
  ],
  sidebarItems: [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "calendar", label: "Schedule", icon: Calendar },
    { id: "logistics", label: "Logistics", icon: Truck },
    { id: "crops", label: "Crop Health", icon: Sprout },
  ],
  kpiData: [
    {
      label: "Total Yield",
      value: "42.8 Tons",
      trend: "+12%",
      positive: true,
      icon: Sprout,
    },
    {
      label: "Harvest Efficiency",
      value: "94.2%",
      trend: "+2.4%",
      positive: true,
      icon: Target,
    },
    {
      label: "Loss Rate",
      value: "1.8%",
      trend: "-0.5%",
      positive: true,
      icon: ArrowDownRight,
    },
    {
      label: "Forecast Accuracy",
      value: "98.1%",
      trend: "Steady",
      positive: null,
      icon: TrendingUp,
    },
  ],
  dashboardStats: [
    {
      label: "Total Revenue",
      value: "$128,430",
      change: "+12.5%",
      isPositive: true,
      icon: TrendingUp,
      color: "emerald",
      trend: [30, 45, 35, 60, 55, 70, 65],
    },
    {
      label: "Active Sessions",
      value: "43,219",
      change: "+3.2%",
      isPositive: true,
      icon: Users,
      color: "blue",
      trend: [50, 40, 60, 45, 70, 80, 75],
    },
    {
      label: "Pending Tasks",
      value: "14",
      change: "-2",
      isPositive: false,
      icon: Clock,
      color: "amber",
      trend: [80, 70, 65, 50, 40, 30, 25],
    },
  ],
  sectorPerformance: [
    {
      name: "North Sector A-14",
      health: 98,
      yield: "High",
      color: "bg-emerald-500",
      status: "Optimal",
    },
    {
      name: "East Sector B-02",
      health: 85,
      yield: "Medium",
      color: "bg-blue-500",
      status: "Stable",
    },
    {
      name: "South Sector C-09",
      health: 72,
      yield: "Low",
      color: "bg-orange-500",
      status: "Action Required",
    },
    {
      name: "West Sector D-05",
      health: 91,
      yield: "High",
      color: "bg-emerald-500",
      status: "Optimal",
    },
  ],
};

export default CONSTANT;
