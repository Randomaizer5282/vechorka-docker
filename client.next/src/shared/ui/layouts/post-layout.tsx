import React, { type ReactNode } from "react";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import { NavCategories } from "@/shared/ui/navigation/nav-categories";
import { PostRelated } from "@/widgets/post-related";
import { useCommonPosts } from "@/shared/api/settings";
import { Sidebar } from "@/shared/ui/layouts/sidebar";
import type { PostProps } from "@/shared/types";

interface Props {
  relatedPosts?: PostProps[] | null;
  left: ReactNode;
  showNewsWidgets?: boolean;
  showAdvert?: boolean;
  showPaper?: boolean;
}

export const PostLayout = ({
  left,
  relatedPosts,
  showNewsWidgets = true,
  showAdvert = true,
  showPaper = true,
}: Props) => {
  const { common } = useCommonPosts();
  return (
    <>
      <LayoutColumn
        left={left}
        right={
          <>
            <div className="hidden md:block mb-6">
              <NavCategories />
            </div>

            <Sidebar
              top={showNewsWidgets && common?.top ? common.top : undefined}
              commented={
                showNewsWidgets && common?.commented
                  ? common.commented
                  : undefined
              }
              advert={showAdvert && common?.advert ? common?.advert : undefined}
              showPaper={showPaper}
            />
          </>
        }
      />
      {relatedPosts && relatedPosts?.length > 0 && (
        <PostRelated title="Читайте также" posts={relatedPosts} />
      )}
      {common?.interest && common.interest.length > 0 && (
        <PostRelated title="Интересное" posts={common.interest} />
      )}
    </>
  );
};
