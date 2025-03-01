import React from "react";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

const socialLinks = [
  { href: "https://m.facebook.com/", src: "/ic_facebook.png", alt: "facebook" },
  {
    href: "https://twitter.com/?lang=en",
    src: "/ic_twitter.png",
    alt: "twitter",
  },
  { href: "https://www.youtube.com", src: "/ic_youtube.png", alt: "youtube" },
  {
    href: "https://www.instagram.com/",
    src: "/ic_instagram.png",
    alt: "instagram",
  },
];

export const SocialLinks = () => {
  return (
    <div className="flex gap-3 justify-center sm:justify-start">
      {socialLinks.map((link, index) => (
        <Link key={index} href={link.href} passHref>
          <div className="flex items-center">
            <Image
              src={link.src}
              alt={link.alt}
              width={24} // Set the width
              height={24} // Set the height
              className="sm:w-6 sm:h-6"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export const FooterMark = () => {
  return (
    <div className="text-gray-400 text-sm sm:text-base flex justify-center px-4 py-2">
      <p>©codeit - 2025</p>
    </div>
  );
};

export const FooterLinks = () => {
  return (
    <div className="flex gap-8 justify-center text-sm sm:text-base text-gray-300">
      <Link href="privacy_policy.html">Privacy Policy</Link>

      <Link href="FAQ.html">FAQ</Link>
    </div>
  );
};

const Footer = ({ isMobile }) => {
  return (
    <footer className="bg-gray-900 py-8 min-h-[12rem] w-full flex items-center ">
      <div
        className={`w-full px-6 mx-auto ${
          isMobile
            ? "text-center flex flex-col gap-4 items-center"
            : "flex justify-between items-center"
        }`}
      >
        {isMobile ? (
          <>
            <FooterLinks />
            <SocialLinks />
            <FooterMark />
          </>
        ) : (
          <>
            <FooterMark />
            <FooterLinks />
            <SocialLinks />
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
