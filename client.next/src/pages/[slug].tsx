import type { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { getPage } from "@/shared/api/pages";
import React from "react";
import type { GetServerSideProps } from "next";
import { PageDetail } from "@/modules/page/ui/page-detail";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const Page = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout
        left={<PageDetail {...post} />}
        interestPosts={interestNews}
        showNewsWidgets={false}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  return await getPage({ slug });
};

export default Page;
