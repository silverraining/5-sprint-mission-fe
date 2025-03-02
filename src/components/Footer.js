import { useState, useEffect } from "react";
import Link from "next/link";

import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";

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
    <div className="flex gap-3 md:justify-center lg:justify-center justify-end">
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
    <div className="whitespace-nowrap text-gray-400 text-sm sm:text-base flex justify-start md:justify-center lg:justify-center md:px-4 py-2">
      <p>©codeit - 2025</p>
    </div>
  );
};

export const FooterLinks = () => {
  return (
    <div className="flex gap-8 justify-start md:justify-center lg:justify-center text-sm sm:text-base text-gray-300 whitespace-nowrap">
      <Link href="privacy_policy.html">Privacy Policy</Link>

      <Link href="FAQ.html">FAQ</Link>
    </div>
  );
};

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <footer className="bg-gray-900 pb-6 min-h-[160px] w-full flex items-start pt-6">
      <div
        className={`w-full px-6 mx-auto ${
          isMobile
            ? "grid grid-cols-2 gap-4 items-center text-center"
            : "flex justify-between items-center"
        }`}
      >
        {isMobile ? (
          <>
            <FooterLinks />
            <SocialLinks />
            <FooterMark />
            <div />
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
