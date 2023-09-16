import { type ReactNode } from "react";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import { PostRelated } from "@/widgets/post-related";
import { useCommonPosts } from "@/shared/api/settings";
import { Sidebar } from "@/shared/ui/layouts/sidebar";

interface Props {
  left: ReactNode;
}

export const TagLayout = ({ left }: Props) => {
  const { common } = useCommonPosts();
  return (
    <>
      <LayoutColumn
        left={left}
        right={<Sidebar top={common?.top} commented={common?.commented} />}
      />
      {common?.interest && common.interest.length > 0 && (
        <PostRelated title="Интересное" posts={common.interest} />
      )}
    </>
  );
};
