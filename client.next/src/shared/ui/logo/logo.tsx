import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  priority?: boolean;
}

export const Logo = ({ priority = false }: Props) => {
  const router = useRouter();

  const ImageLogo = () => (
    <Image
      className="object-contain"
      fill
      src="/images/logo.png"
      alt="Вечерний ставрополь"
      priority
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
