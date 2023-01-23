import React, { ReactNode } from "react";
import { PaperLinks } from "@/widgets/paper-links";
import { NewsCommentedDynamic } from "@/widgets/news-commented";
import { NewsTopDynamic } from "@/widgets/news-top";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import { PostRelated } from "@/widgets/post-related";
import { DynamicAdvert } from "@/widgets/advert";
import { useSettings } from "@/app/contexts/settings-context";
import type { PostProps } from "@/shared/types";

interface Props {
  left: ReactNode;
  interestPosts?: PostProps[];
}

export const TagLayout = ({ left, interestPosts }: Props) => {
  const { advert } = useSettings();
  return (
    <>
      <LayoutColumn
        left={left}
        right={
          <>
            {advert && !!Number(advert.advert_block_2_mobile_visible) && (
              <DynamicAdvert
                className="block md:hidden my-6"
                type={advert.advert_block_2_mobile_type}
                size="300x300"
                imageUrl={advert.advert_block_2_mobile_image_url}
                href={advert.advert_block_2_mobile_href}
                htmlCode={advert.advert_block_2_mobile_html_code}
              />
            )}

            {/* advert block 2 pc 300x600 */}
            {advert && !!Number(advert.advert_block_2_pc_visible) && (
              <DynamicAdvert
                className="hidden md:block mt-6"
                type={advert.advert_block_2_pc_type}
                size="300x600"
                imageUrl={advert.advert_block_2_pc_image_url}
                href={advert.advert_block_2_pc_href}
                htmlCode={advert.advert_block_2_pc_html_code}
              />
            )}
            <div className="smx1:flex md:block mt-6">
              <NewsTopDynamic className="smx1:mr-3 md:mr-0" />
              <NewsCommentedDynamic className="mt-6 smx1:mt-0 md:mt-6" />
            </div>
            <PaperLinks className="relative md:mt-20" />
          </>
        }
      />
      {interestPosts && interestPosts.length > 0 && (
        <PostRelated title="Интересное" posts={interestPosts} />
      )}
    </>
  );
};
