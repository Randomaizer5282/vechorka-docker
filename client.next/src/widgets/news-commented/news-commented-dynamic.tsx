import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import React from "react";
import { NewsCommentedProps } from "@/widgets/news-commented";

export const NewsCommentedDynamic = dynamic<NewsCommentedProps>(
  (): Promise<({ className }: NewsCommentedProps) => JSX.Element> =>
    import("@/widgets/news-commented").then((mod) => mod.NewsCommented),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
