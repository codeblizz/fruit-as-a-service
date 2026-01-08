"use client";

import React from "react";
import Section from "@/packages/ui/src/atoms/section";
import NextLink from "@/packages/ui/src/atoms/link";
import NextImage from "@/packages/ui/src/atoms/image";
import { 
  Mail as EnvelopeIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Heart as HeartIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedInIcon
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" }
    ],
    products: [
      { name: "Fresh Fruits", href: "/fruits/buyer" },
      { name: "Organic Selection", href: "/organic" },
      { name: "Fruit Boxes", href: "/boxes" },
      { name: "Business Solutions", href: "/business" },
      { name: "Gift Cards", href: "/gift-cards" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "FAQ", href: "/faq" }
    ],
    sellers: [
      { name: "Become a Seller", href: "/fruits/seller" },
      { name: "Seller Resources", href: "/seller-resources" },
      { name: "Seller Support", href: "/seller-support" },
      { name: "Partner Program", href: "/partners" },
      { name: "Wholesale", href: "/wholesale" }
    ]
  };
  
  return (
    <footer className="bg-gradient-to-br from-primary via-fig to-primary text-primary-text">
      {/* Main Footer Content */}
      <Section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="fade-in">
              <NextLink href="/" className="flex items-center space-x-3 mb-6">
                <NextImage
                  alt="FaaS Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                  src="/images/faas-512x512.png"
                />
                <span className="text-2xl font-bold text-gradient">Fruit as a Service</span>
              </NextLink>
              <p className="text-primary-text/80 mb-6 leading-relaxed">
                Delivering the freshest, highest quality fruits straight to your door. 
                Supporting local farmers and communities while providing exceptional service.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <MapPinIcon className="w-5 h-5 text-apple-green" />
                <span className="text-primary-text/80">123 Fresh Street, Fruit Valley, CA 90210</span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <PhoneIcon className="w-5 h-5 text-apple-green" />
                <span className="text-primary-text/80">(555) 123-FRUIT</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-5 h-5 text-apple-green" />
                <span className="text-primary-text/80">hello@fruitasaservice.com</span>
              </div>
            </div>
          </div>
          
          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div
              key={category}
              className="slide-up"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <h4 className="text-lg font-semibold text-primary-text mb-4 capitalize">
                {category === "company" ? "Company" : category === "products" ? "Products" : category === "support" ? "Support" : "For Sellers"}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <NextLink
                      href={link.href}
                      className="text-primary-text/80 hover:text-apple-green transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      
      {/* Newsletter Signup */}
      <Section className="border-t border-primary-text/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center fade-in">
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              Stay Fresh with Our Newsletter
            </h3>
            <p className="text-primary-text/80 mb-6 max-w-2xl mx-auto">
              Get the latest updates on seasonal fruits, special offers, and healthy living tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-surface-primary text-foreground placeholder-secondary-text border border-quaternary focus:ring-2 focus:ring-apple-green focus:border-transparent"
              />
              <button className="btn-primary px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Bottom Bar */}
      <Section className="border-t border-primary-text/20 bg-primary/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 fade-in">
            <div className="flex items-center space-x-4 text-sm text-primary-text/80">
              <span>© {currentYear} Fruit as a Service. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <NextLink href="/privacy" className="hover:text-apple-green transition-colors">
                Privacy Policy
              </NextLink>
              <span>•</span>
              <NextLink href="/terms" className="hover:text-apple-green transition-colors">
                Terms of Service
              </NextLink>
              <span>•</span>
              <NextLink href="/cookies" className="hover:text-apple-green transition-colors">
                Cookie Policy
              </NextLink>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-text/80 mr-2">Follow us:</span>
              {[
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
                { Icon: TwitterIcon, href: "#", label: "Twitter" },
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: LinkedInIcon, href: "#", label: "LinkedIn" }
              ].map(({ Icon, href, label }) => (
                <NextLink
                  key={label}
                  href={href}
                  className="p-2 text-primary-text/80 hover:text-apple-green transition-colors duration-200 hover:bg-apple-green/10 rounded-lg"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </NextLink>
              ))}
            </div>
            
            {/* Made with Love */}
            <div className="flex items-center space-x-2 text-sm text-primary-text/80 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-strawberry animate-pulse" />
              <span>for fresh fruit lovers</span>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}

export default Footer;
