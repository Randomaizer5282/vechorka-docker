import { PostLayout } from "@/shared/ui/layouts";
import { getGeneralSettings } from "@/shared/api/settings";
import { SearchList } from "@/modules/search/ui/search-list";

const SearchPage = () => {
  return <PostLayout left={<SearchList />} showNewsWidgets={false} />;
};

export const getServerSideProps = async () => {
  // global settings
  const { settings, taxonomies } = await getGeneralSettings({
    withTaxonomies: true,
  });

  return {
    props: {
      settings,
      taxonomies,
    },
  };
};

export default SearchPage;
