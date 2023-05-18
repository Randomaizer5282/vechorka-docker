import React, { useEffect, useRef, useState } from "react";
import cn from "clsx";
import { useKeenSlider } from "keen-slider/react";
import { getPostGalleryByIds } from "@/shared/api/posts";
import { SimpleLoader } from "@/shared/ui/loaders";
import { Arrow } from "@/shared/ui/buttons";
import NextImage from "next/image";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";
import { settings } from "@/shared/config";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import type { ImageWithSizes, PostProps } from "@/shared/types";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

interface Props {
  ids: string;
  title?: string;
  perView?: number;
}

export const GalleryByIds = ({ ids, title, perView = 3 }: Props) => {
  const [images, setImages] = useState<Array<PostProps & ImageWithSizes>>([]);
  const [slides, setSlides] = useState<SlideImage[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    breakpoints: {
      "(max-width: 1000px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(max-width: 420px)": {
        slides: { perView: 1, spacing: 5 },
      },
    },
    slides: {
      perView,
      spacing: 10,
    },
    created() {
      setSliderLoaded(true);
    },
  });

  useEffect(() => {
    setLoading(true);

    const fetchImages = async () => {
      try {
        const fetchedImages: PostProps[] = await getPostGalleryByIds(ids);

        if (fetchedImages?.length) {
          const slides: SlideImage[] = [];
          fetchedImages?.forEach((image) => {
            if (image.preview?.url) {
              slides.push({
                src: `${settings.uploadUrl}/${image.preview?.url}`,
                description: image.preview?.caption,
                alt: image.preview?.alt,
              });
            }
          });

          setSlides(slides);
          setImages(fetchedImages);
        }
      } catch (e) {
        console.log("error");
      }
      setLoading(false);
    };

    ids && isVisible && fetchImages();
  }, [ids, isVisible]);

  if (!loading && (!ids.length || !images.length)) return null;

  return (
    <div className="mt-6 md:mt-12" ref={ref}>
      {loading && <SimpleLoader />}
      {!loading && images.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-5">
            <div>{title && <h3 className="text-grey-500">{title}</h3>}</div>
            {/* navigation */}
            {sliderLoaded && (
              <div className="flex">
                <Arrow
                  left
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                />
                <Arrow
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                />
              </div>
            )}
          </div>

          <div ref={sliderRef} className="keen-slider">
            {images.map((image, index) => {
              const src =
                image.preview?.sizes?.medium?.url || image.preview?.url || null;
              if (src) {
                return (
                  <div key={image.id} className={cn("keen-slider__slide")}>
                    <a
                      href="#"
                      className={cn("block")}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveIndex(index);
                        setPreviewOpen(true);
                      }}
                    >
                      <div className="relative w-full h-[190px] sm:h-[260px] bg-gradient-to-t to-grey-400/30 from-grey-400/70">
                        <NextImage
                          src={`${settings.uploadUrl}/${src}`}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="top"
                        />
                      </div>
                    </a>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>

          {slides?.length > 0 && (
            <Lightbox
              styles={{
                root: { "--yarl__slide_description_text_align": "center" },
              }}
              index={activeIndex}
              toolbar={{ buttons: ["close"] }}
              open={previewOpen}
              close={() => setPreviewOpen(false)}
              controller={{ closeOnBackdropClick: true }}
              slides={slides}
              plugins={[Captions]}
              carousel={{ finite: slides.length <= 1 }}
              render={{
                buttonPrev: slides.length <= 1 ? () => null : undefined,
                buttonNext: slides.length <= 1 ? () => null : undefined,
              }}
            />
          )}
        </>
      )}
    </div>
  );
};
