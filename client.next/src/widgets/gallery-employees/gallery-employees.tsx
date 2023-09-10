import React, { useEffect, useRef, useState } from "react";
import cn from "clsx";
import { useKeenSlider } from "keen-slider/react";
import { getPosts } from "@/shared/api/posts";
import type { PostProps } from "@/shared/types";
import { SimpleLoader } from "@/shared/ui/loaders";
import { Arrow } from "@/shared/ui/buttons";
import NextImage from "next/image";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";
import { config } from "@/shared/config";
import { ActiveEmployee } from "@/widgets/gallery-employees/active-employee";

export const GalleryEmployees = () => {
  const [employees, setEmployees] = useState<PostProps[]>([]);
  const [activeEmployee, setActiveEmployee] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    breakpoints: {
      "(max-width: 1000px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(max-width: 420px)": {
        slides: { perView: 2, spacing: 5 },
      },
    },
    slides: {
      perView: 5,
      spacing: 10,
    },
    created() {
      setSliderLoaded(true);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    setLoading(true);

    const fetchPosts = async () => {
      try {
        const { data } = await getPosts({
          limit: 20,
          postType: "employee",
        });

        if (data?.length) {
          data.sort((a, b) => {
            return a.meta?.order > b.meta?.order ? 1 : -1;
          });
          setEmployees(data);
          setActiveEmployee(data[0]);
        }
      } catch (e) {
        console.log("error");
      }
      setLoading(false);
    };

    isVisible && fetchPosts();
  }, [isVisible]);

  if (!loading && !employees.length) return null;

  return (
    <>
      <div className="mt-6 md:mt-12" ref={ref}>
        {loading && <SimpleLoader />}
        {!loading && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-grey-500">Сотрудники</h3>
              {/* navigation */}
              {sliderLoaded && instanceRef.current && (
                <div className="flex">
                  <Arrow
                    left
                    onClick={(e: any) =>
                      e.stopPropagation() || instanceRef.current?.prev()
                    }
                    disabled={currentSlide === 0}
                  />
                  <Arrow
                    onClick={(e: any) =>
                      e.stopPropagation() || instanceRef.current?.next()
                    }
                    disabled={
                      currentSlide ===
                      instanceRef?.current?.track?.details?.slides?.length - 1
                    }
                  />
                </div>
              )}
            </div>

            <div ref={sliderRef} className="keen-slider">
              {employees.map((employee) => {
                const src =
                  employee.preview?.sizes?.medium?.url ||
                  employee.preview?.url ||
                  null;
                const fullName = employee.meta?.full_name;
                const role = employee.meta?.role;
                const alt =
                  employee.preview?.caption ||
                  employee.preview?.description ||
                  "";

                return (
                  <div
                    key={employee.id}
                    className={cn(
                      "keen-slider__slide flex flex-col text-center cursor-pointer"
                    )}
                    onClick={() => setActiveEmployee(employee)}
                  >
                    {src && (
                      <div className="relative w-full h-[200px]">
                        <NextImage
                          src={`${config.uploadUrl}/${src}`}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="top"
                          alt={alt}
                        />
                      </div>
                    )}
                    {role && <p className="mt-3 text-13px">{role}</p>}
                    {fullName && <h5 className="mt-3">{fullName}</h5>}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      {activeEmployee && <ActiveEmployee employee={activeEmployee} />}
    </>
  );
};
