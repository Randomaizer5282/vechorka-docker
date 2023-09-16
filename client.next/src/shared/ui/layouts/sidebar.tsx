import { DynamicAdvert } from "@/widgets/advert";
import { NewsTop } from "@/widgets/news-top";
import { NewsCommented } from "@/widgets/news-commented";
import { PaperLinks } from "@/widgets/paper-links";
import { type PostProps } from "@/shared/types";

interface Props {
  top?: PostProps[] | null;
  commented?: PostProps[] | null;
  advert?: Record<string, string> | null;
  showPaper?: boolean;
}

export const Sidebar = ({
  top,
  commented,
  advert,
  showPaper = true,
}: Props) => {
  return (
    <>
      {/* advert block 2 mobile 300x300 */}
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
      <div className="smx1:flex md:block">
        {top && <NewsTop className="smx1:mr-3 md:mr-0" posts={top} />}
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
        {commented && (
          <NewsCommented className="mt-6 smx1:mt-0 md:mt-6" posts={commented} />
        )}
      </div>

      {/* advert block 3 300x300 */}
      {advert && !!Number(advert.advert_block_3_visible) && (
        <DynamicAdvert
          className="mt-6"
          type={advert.advert_block_3_type}
          size="300x300"
          imageUrl={advert.advert_block_3_image_url}
          href={advert.advert_block_3_href}
          htmlCode={advert.advert_block_3_html_code}
        />
      )}

      {showPaper && <PaperLinks className="relative md:mt-20" />}

      {/* advert block 4 pc 300x600 */}
      {advert && !!Number(advert.advert_block_4_pc_visible) && (
        <DynamicAdvert
          className="hidden md:block mt-6"
          type={advert.advert_block_4_pc_type}
          size="300x600"
          imageUrl={advert.advert_block_4_pc_image_url}
          href={advert.advert_block_4_pc_href}
          htmlCode={advert.advert_block_4_pc_html_code}
        />
      )}
      {/* advert block 4 mobile 300x300 */}
      {advert && !!Number(advert.advert_block_4_mobile_visible) && (
        <DynamicAdvert
          className="block md:hidden mt-6"
          type={advert.advert_block_4_mobile_type}
          size="300x300"
          imageUrl={advert.advert_block_4_mobile_image_url}
          href={advert.advert_block_4_mobile_href}
          htmlCode={advert.advert_block_4_mobile_html_code}
        />
      )}
    </>
  );
};
