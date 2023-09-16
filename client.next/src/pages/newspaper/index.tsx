import { type NewsPaperAllProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { NewspaperArchive } from "@/modules/newspaper/ui/newspaper-archive";
import { getNewspapers } from "@/shared/api/newspaper";
import { getGeneralSettings } from "@/shared/api/settings";
import { type GetStaticProps } from "next";

interface Props {
  newspapers: NewsPaperAllProps;
}

const NewsPaperIndex = ({ newspapers }: Props) => {
  return (
    <>
      <PostLayout
        left={<NewspaperArchive newspapers={newspapers} />}
        showNewsWidgets={false}
      />
    </>
  );
};

// export const getServerSideProps = async () => {
export const getStaticProps: GetStaticProps = async () => {
  let newspapers = {
    posts: null,
    postsMonths: null,
    postsYear: null,
    allYears: null,
    lastRelease: null,
  };

  try {
    newspapers = await getNewspapers({
      allYears: true,
      lastRelease: true,
    });
  } catch (error) {
    console.log("newspaper", error);
  }

  if (!newspapers.posts) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies } = await getGeneralSettings({
    withTaxonomies: true,
  });

  return {
    props: {
      newspapers,
      settings,
      taxonomies,
    },
  };
};

export default NewsPaperIndex;
