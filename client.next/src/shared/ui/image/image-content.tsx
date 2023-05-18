import React, { useState } from "react";
import { ImageCaption } from "@/shared/ui/image/image-caption";
import cn from "clsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

interface Props {
  width: string | number | null;
  height: string | number | null;
  src: string;
  alt: string | null;
  fullSrc: string | null;
  caption: string | null;
  className: string | null;
}

export const ImageContent = ({
  width,
  height,
  caption,
  src,
  fullSrc,
  alt,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);

  const Image = () => (
    <>
      {fullSrc ? (
        <>
          <a
            href="#"
            className={cn("relative inline-flex", !caption && className)}
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <img
              className={cn({ "h-auto": !height })}
              src={src}
              width={width ?? 300}
              height={height ?? "100%"}
              alt={alt ?? ""}
              loading="lazy"
            />
          </a>
          <Lightbox
            styles={{
              root: { "--yarl__slide_description_text_align": "center" },
            }}
            carousel={{ finite: true }}
            toolbar={{ buttons: ["close"] }}
            open={open}
            close={() => setOpen(false)}
            controller={{ closeOnBackdropClick: true }}
            slides={[
              {
                src: fullSrc,
                description: caption ?? "",
              },
            ]}
            render={{
              buttonPrev: () => null,
              buttonNext: () => null,
            }}
            plugins={[Captions]}
          />
        </>
      ) : (
        <img
          className={cn({ "h-auto": !height }, !caption && className)}
          src={src}
          width={width ?? 300}
          height={height ?? "100%"}
          alt={alt ?? ""}
          loading="lazy"
        />
      )}
    </>
  );

  return (
    <>
      {caption ? (
        <>
          {/* align center wrap*/}
          {className?.match(/aligncenter/gi) ? (
            <div className="text-center">
              <span className={cn("relative inline-flex", className)}>
                <Image />
                {caption && <ImageCaption caption={caption} />}
              </span>
            </div>
          ) : (
            <span className={cn("relative inline-flex", className)}>
              <Image />
              {caption && <ImageCaption caption={caption} />}
            </span>
          )}
        </>
      ) : (
        <Image />
      )}
    </>
  );
};
