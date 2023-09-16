import { type ReactNode } from "react";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import { useCommonPosts } from "@/shared/api/settings";
import { Sidebar } from "@/shared/ui/layouts/sidebar";

interface Props {
  left: ReactNode;
}

export const HomeLayout = ({ left }: Props) => {
  const { common } = useCommonPosts();
  return (
    <LayoutColumn
      left={left}
      right={
        <Sidebar
          top={common?.top}
          commented={common?.commented}
          advert={common?.advert}
        />
      }
    />
  );
};
