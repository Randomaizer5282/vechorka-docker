import { mainMenu, menuNewsItem, settings } from "@/shared/config";
import type { TaxonomiesProps } from "@/shared/types";
import { api } from "@/shared/api/core";

export const getGeneralSettings = async () => {
  let taxonomies: TaxonomiesProps = {
    categories: [],
    geography: [],
    tags: [],
    allCategories: [],
  };
  let advert = null;

  try {
    const settings = await api.get("settings/common");
    taxonomies = settings.taxonomies;
    advert = settings.advert;

    // all categories with news taxonomy
    taxonomies.allCategories = taxonomies.categories;

    // remove news category
    taxonomies.categories = taxonomies.categories.filter(
      (cat) => cat.slug !== "news"
    );
  } catch (error) {
    console.log("settings: ", error);
  }

  // TODO: check this code
  const mainNavigation = [
    {
      ...menuNewsItem,
      child: taxonomies.categories.filter((cat) => cat.slug !== "news"),
    },
    ...mainMenu,
  ];

  return {
    // TODO: check this code
    settings: {
      ...settings,
      menus: {
        main: mainNavigation,
      },
    },
    taxonomies,
    advert,
  };
};
