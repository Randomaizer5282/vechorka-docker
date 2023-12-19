import React from "react";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PostDetail } from "@/modules/post/ui/post-detail";
import { getPostById } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";

interface Props {
  post: PostProps;
}

const PreviewDetailPage = ({ post }: Props) => {
  return (
    <PostLayout
      left={post ? <PostDetail post={post} showComment /> : null}
      showNewsWidgets={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  preview,
}) => {
  if (!preview || !params?.id) {
    return {
      notFound: true,
    };
  }

  let post = null;

  try {
    post = await getPostById(+params.id, { isPreview: true });
  } catch (error) {
    console.log("preview", error);
  }

  if (!post) {
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
      settings,
      taxonomies,
      post,
    },
  };
};

export default PreviewDetailPage;
