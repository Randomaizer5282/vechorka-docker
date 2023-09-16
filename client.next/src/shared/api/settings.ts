import { mainMenu, menuNewsItem, config } from "@/shared/config";
import type { PostProps, TaxonomiesProps } from "@/shared/types";
import { api } from "@/shared/api/index";
import { encodeQueryData } from "@/shared/lib/helpers";
import { useQuery } from "@tanstack/react-query";

interface CommonPostsParams {
  withTaxonomies?: boolean;
  withInterest?: boolean;
  withTop?: boolean;
  withCommented?: boolean;
  withAdvert?: boolean;
}

export interface CommonPostsResponse {
  taxonomies: TaxonomiesProps;
  interest: PostProps[] | null;
  top: PostProps[] | null;
  commented: PostProps[] | null;
  advert: Record<string, string> | null;
}

export const getCommonPosts = (
  params?: CommonPostsParams
): Promise<CommonPostsResponse> => {
  const queryParams = encodeQueryData(params);
  return api.get(`settings/common${queryParams ? `?${queryParams}` : ""}`);
};

export const useCommonPosts = () => {
  const { data: common, isLoading } = useQuery({
    queryKey: ["common"],
    queryFn: async () =>
      await getCommonPosts({
        // withTaxonomies: value.taxonomies
        withAdvert: true,
        withCommented: true,
        withInterest: true,
        withTop: true,
      }),
  });

  return { common, isLoading };
};

export const getGeneralSettings = async (params?: CommonPostsParams) => {
  let taxonomies: TaxonomiesProps = {
    categories: [],
    geography: [],
    tags: [],
    allCategories: [],
  };
  let interest = null;
  let top = null;
  let commented = null;
  let advert = null;

  try {
    const fetchedSettings = await getCommonPosts(params);
    if (fetchedSettings.taxonomies) {
      taxonomies = fetchedSettings.taxonomies;
      // all categories with news taxonomy
      taxonomies.allCategories = taxonomies.categories;
      // remove news category
      taxonomies.categories = taxonomies?.categories?.filter(
        (cat) => cat.slug !== "news"
      );
    }
    interest = fetchedSettings.interest;
    top = fetchedSettings.commented;
    commented = fetchedSettings.interest;
    advert = fetchedSettings.advert;
  } catch (error) {
    console.log("settings: ", error);
  }

  // TODO: check this code
  const mainNavigation = [
    {
      ...menuNewsItem,
      child: taxonomies?.categories?.filter((cat) => cat.slug !== "news"),
    },
    ...mainMenu,
  ];

  return {
    // TODO: check this code
    settings: {
      ...config,
      menus: {
        main: mainNavigation,
      },
    },
    taxonomies,
    interest,
    top,
    commented,
    advert,
  };
};
