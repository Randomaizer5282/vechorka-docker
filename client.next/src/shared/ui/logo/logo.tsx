import React from "react";
import Link from "next/link";

interface Props {
  priority?: boolean;
}

const ImageLogo = () => (
  <img
    className="object-contain"
    src="/images/logo.png"
    alt="Вечерний ставрополь"
  />
);

export const Logo = ({ priority = false }: Props) => {
  return (
    <Link href="/" className="relative block w-full h-full">
      <ImageLogo />
    </Link>
  );
};
