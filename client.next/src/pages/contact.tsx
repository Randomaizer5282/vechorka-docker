import { getPage } from "@/shared/api/pages";
import { type PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PageContact } from "@/modules/page/ui/page-contact";
import { type GetStaticProps } from "next";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const Contact = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout
        left={<PageContact {...post} />}
        interestPosts={interestNews}
        showNewsWidgets={false}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return await getPage({ slug: "contact" });
};

//
// export const getServerSideProps = async () => {
//   return await getPage({ slug: "contact" });
// };

export default Contact;
