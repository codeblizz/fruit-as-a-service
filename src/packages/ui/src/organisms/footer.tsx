"use client";

import React from "react";
import useAuth from "../molecules/hooks/useAuth";
import NextLink from "@/packages/ui/src/atoms/link";
import Section from "@/packages/ui/src/atoms/section";
import NextImage from "@/packages/ui/src/atoms/image";
import CONSTANT from "@/packages/helpers/src/constants";
import {
  Mail as EnvelopeIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Heart as HeartIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedInIcon,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const {
    isDashboard,
    isSigninPage,
    isSignupPage,
    isPasswordResetPage,
    isEmailNotificationPage,
  } = useAuth();

  if (
    isDashboard ||
    isSigninPage ||
    isSignupPage ||
    isPasswordResetPage ||
    isEmailNotificationPage
  ) {
    return;
  }

  return (
    <footer className="bg-gradient-to-br from-primary via-fig to-primary text-ghost-apple">
      {/* Main Footer Content */}
      <Section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="fade-in">
              <NextLink
                href="/"
                className="flex -mb-4 items-start h-1/3 w-full"
              >
                <NextImage
                  priority
                  width={80}
                  height={80}
                  alt="FaaS Logo"
                  src="/images/faas-logo-512.png"
                  className="size-auto -ml-6 -mt-6 object-contain"
                />
                <div className="flex flex-col justify-center items-center -ml-7">
                  <span className="text-sm font-bold text-gradient">
                    Fruit as a Service
                  </span>
                  <span className="text-xs text-secondary-text pl-2">
                    Fresh • Fast • Reliable
                  </span>
                </div>
              </NextLink>
              <p className="text-ghost-apple/80 mb-4 text-[12px] w-full leading-relaxed">
                Delivering the freshest, highest quality fruits straight to your
                door. Supporting local farmers and communities while providing
                exceptional service.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <MapPinIcon className="w-5 h-5 min-w-max text-apple-green" />
                <span className="text-ghost-apple/80 text-xs">
                  13 Fresh Street, Victoria Island, Lagos, NG.
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <PhoneIcon className="w-5 h-5 text-apple-green" />
                <span className="text-ghost-apple/80 text-xs">
                  (+234) 07041333458
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-5 h-5 text-apple-green" />
                <span className="text-ghost-apple/80 text-xs">
                  hello@fruitasaservice.com
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(CONSTANT.footerLinks).map(
            ([category, links], index) => (
              <div
                key={category}
                className="flex flex-col items-center"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <h4 className="text-lg font-semibold text-sm underline underline-offset-3 text-ghost-apple mb-4 capitalize">
                  {category === "company"
                    ? "Company"
                    : category === "products"
                    ? "Products"
                    : category === "support"
                    ? "Support"
                    : "For Sellers"}
                </h4>
                <ul className="space-y-2 inline-flex text-[12px] flex-col items-center">
                  {links.map((link) => (
                    <li key={link.name}>
                      <NextLink
                        href={link.href}
                        className="text-ghost-apple/80 hover:text-apple-green transition-colors duration-200 hover:underline"
                      >
                        {link.name}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </Section>

      {/* Newsletter Signup */}
      <Section className="border-t border-ghost-apple/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center fade-in">
            <h3 className="text-xl font-bold text-ghost-apple mb-4">
              Stay Fresh with Our Newsletter
            </h3>
            <p className="text-ghost-apple/80 text-sm mb-6 max-w-2xl mx-auto">
              Get the latest updates on seasonal fruits, special offers, and
              healthy living tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-1 rounded-lg bg-surface-primary text-blackcurrant placeholder-secondary-text border border-quaternary focus:ring-2 focus:ring-apple-green focus:border-transparent"
              />
              <button className="btn-primary px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Bottom Bar */}
      <Section className="border-t border-ghost-apple/20 bg-primary/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 fade-in">
            <div className="flex items-center space-x-4 text-sm text-ghost-apple/80">
              <span>
                © {currentYear} Fruit as a Service. All rights reserved.
              </span>
              <span className="hidden md:inline">•</span>
              <NextLink
                href="/privacy"
                className="hover:text-apple-green transition-colors"
              >
                Privacy Policy
              </NextLink>
              <span>•</span>
              <NextLink
                href="/terms"
                className="hover:text-apple-green transition-colors"
              >
                Terms of Service
              </NextLink>
              <span>•</span>
              <NextLink
                href="/cookies"
                className="hover:text-apple-green transition-colors"
              >
                Cookie Policy
              </NextLink>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-ghost-apple/80 mr-2">
                Follow us:
              </span>
              {[
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
                { Icon: TwitterIcon, href: "#", label: "Twitter" },
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: LinkedInIcon, href: "#", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <NextLink
                  key={label}
                  href={href}
                  className="p-2 text-ghost-apple/80 hover:text-apple-green transition-colors duration-200 hover:bg-apple-green/10 rounded-lg"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </NextLink>
              ))}
            </div>

            {/* Made with Love */}
            {/* <div className="flex items-center space-x-2 text-sm text-ghost-apple/80 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-strawberry animate-pulse" />
              <span>for fresh fruit lovers</span>
            </div> */}
          </div>
        </div>
      </Section>
    </footer>
  );
}

export default Footer;
