import type { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { getPage } from "@/shared/api/pages";
import { PageDetail } from "@/modules/page/ui/page-detail";
import { getPosts } from "@/shared/api/posts";
import { type GetStaticProps } from "next";

interface Props {
  post: PostProps;
}

const Page = ({ post }: Props) => {
  return (
    <PostLayout
      left={<PageDetail {...post} />}
      showNewsWidgets={false}
      showAdvert={false}
    />
  );
};

export const getStaticPaths = async () => {
  const paths: { params: { slug: string } }[] = [];

  try {
    const posts = await getPosts({ postType: "page" });
    if (posts?.data?.length) {
      posts.data.forEach((post) => {
        if (post.slug !== "contact" && post.slug !== "about") {
          paths.push({ params: { slug: post.slug } });
        }
      });
    }
  } catch (e) {
    console.error(e);
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  return await getPage({ slug });
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const slug = params?.slug as string;
//   return await getPage({ slug });
// };

export default Page;
