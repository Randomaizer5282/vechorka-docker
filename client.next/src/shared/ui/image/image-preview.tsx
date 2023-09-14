import React from "react";
import Link from "next/link";
import cn from "clsx";
import NextImage from "next/legacy/image";
import type { ImageProps } from "@/shared/types";
import { config } from "@/shared/config";
import { ImageCaption } from "@/shared/ui/image/image-caption";
import { ImageDescription } from "@/shared/ui/image/image-description";

interface Props extends ImageProps {
  href?: string;
  className?: string;
  overlay?: boolean;
  hoverEffect?: boolean;
  children?: React.ReactNode;
  screenSizes?: string;
  priority?: boolean;
}

const Image = ({ url, alt = "", className, screenSizes, priority }: Props) =>
  url ? (
    <NextImage
      className={cn(className, "pointer-events-auto object-cover object-top")}
      src={url}
      alt={alt}
      layout="fill"
      sizes={screenSizes}
      priority={priority}
      // sizes="(max-width: 460px) 46vw, (max-width: 768px) 76vw, (max-width: 1024px) 104vw, (max-width: 1200px) 120vw, 100vw"
    />
  ) : null;

export const ImagePreview = ({
  url,
  alt,
  href,
  caption,
  description,
  className,
  overlay = false,
  hoverEffect = false,
  children,
  screenSizes,
  priority,
}: Props) => {
  return (
    <div
      className={cn(
        "relative w-full h-full group overflow-hidden bg-gradient-to-t to-grey-400/30 from-grey-400/70",
        className,
        hoverEffect && ""
      )}
    >
      {href && url && (
        <Link
          href={href}
          prefetch={false}
          className={cn(
            "relative block w-full h-full pointer-events-auto",
            hoverEffect &&
              "group-hover:scale-110 transition-transform duration-300"
          )}
        >
          <Image
            url={`${config.uploadUrl}/${url}`}
            alt={alt}
            screenSizes={screenSizes}
            priority={priority}
          />
        </Link>
      )}
      {!href && url && (
        <Image
          url={`${config.uploadUrl}/${url}`}
          alt={alt}
          screenSizes={screenSizes}
          priority={priority}
        />
      )}
      {overlay ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t to-black/30 from-black/70 group-hover:opacity-50 transition pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none">{children}</div>
        </>
      ) : (
        children
      )}
      {caption && <ImageCaption caption={caption} />}
      {description && (
        <ImageDescription
          description={description}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
        />
      )}
    </div>
  );
};
