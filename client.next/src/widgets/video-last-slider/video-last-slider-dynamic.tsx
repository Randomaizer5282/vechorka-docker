import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import React from "react";

export const VideoLastSliderDynamic = dynamic(
  (): Promise<() => null | JSX.Element> =>
    import("@/widgets/video-last-slider").then((mod) => mod.VideoLastSlider),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
