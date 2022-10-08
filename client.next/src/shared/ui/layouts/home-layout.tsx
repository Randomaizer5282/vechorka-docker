import React from "react";
import { PaperLinks } from "@/widgets/paper-links";
import { CommentLast } from "@/widgets/comment-last";
import { PostTopDynamic } from "@/widgets/post-top";
import { DynamicAdsBanner } from "@/ads/ads-banner";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import { NextPage } from "next";

interface Props {
  left: React.ReactNode;
}

export const HomeLayout: NextPage<Props> = ({ left }) => {
  return (
    <LayoutColumn
      left={left}
      right={
        <>
          <div className="smx1:flex md:block">
            <PostTopDynamic className="smx1:mr-3 md:mr-0" />
            <DynamicAdsBanner
              className="block smx1:hidden mt-6"
              type="280x265"
            />
            <CommentLast className="mt-6 smx1:mt-0 md:mt-12" />
            <DynamicAdsBanner
              className="block smx1:hidden mt-6"
              type="280x265"
            />
          </div>

          <PaperLinks />

          <div className="w-full smx1:flex smx1:gap-2 md:block mt-6 md:mt-12">
            <DynamicAdsBanner className="hidden md:block" type="280x600" />
            <DynamicAdsBanner className="md:mt-12" type="280x265" />
            <DynamicAdsBanner
              className="hidden smx1:block md:hidden"
              type="280x265"
            />
            <DynamicAdsBanner
              className="hidden smx1:block md:hidden"
              type="280x265"
            />
            <DynamicAdsBanner
              className="hidden md:block md:mt-12"
              type="280x600"
            />
          </div>
        </>
      }
    />
  );
};
