import { getPage } from "@/shared/api/pages";
import { type PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PageAbout } from "@/modules/page/ui/page-about";
import { type GetStaticProps } from "next";

interface Props {
  post: PostProps;
}

const About = ({ post }: Props) => {
  return (
    <PostLayout
      left={<PageAbout {...post} />}
      showNewsWidgets={false}
      showAdvert={false}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return await getPage({ slug: "about" });
};

// export const getServerSideProps = async () => {
//   return await getPage({ slug: "about" });
// };

export default About;
