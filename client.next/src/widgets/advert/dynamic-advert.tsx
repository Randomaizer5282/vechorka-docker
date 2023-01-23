import dynamic from "next/dynamic";
import type { AdvertProps } from "@/widgets/advert/index";
import { SimpleLoader } from "@/shared/ui/loaders";

export const DynamicAdvert = dynamic<AdvertProps>(
  (): Promise<
    ({
      size,
      type,
      imageUrl,
      href,
      htmlCode,
      className,
    }: AdvertProps) => JSX.Element | null
  > => import("@/widgets/advert").then((mod) => mod.Advert),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
