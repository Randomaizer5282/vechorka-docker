import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  priority?: boolean;
}

export const Logo = ({ priority = false }: Props) => {
  const router = useRouter();

  const ImageLogo = () => (
    <img
      className="object-contain"
      src="/images/logo.png"
      alt="Вечерний ставрополь"
    />
  );

  return (
    <>
      {router.pathname === "/" ? (
        <div className="relative w-full h-full">
          <ImageLogo />
        </div>
      ) : (
        <Link href="/" className="relative block w-full h-full">
          <ImageLogo />
        </Link>
      )}
    </>
  );
};
