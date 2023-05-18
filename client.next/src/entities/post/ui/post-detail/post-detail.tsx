import React, { Fragment } from "react";
import type { PostProps } from "@/shared/types";
import { ImagePreview } from "@/shared/ui/image";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { Heading } from "@/shared/ui/heading";
import { parseContent } from "@/shared/lib/content";
import { CommentForm } from "@/entities/comment/ui/comment-form";
import { CommentList } from "@/entities/comment/ui/comment-list";
import { PollView } from "@/entities/poll/ui/poll-view";
import { ShareLinks } from "@/shared/ui/share-links";
import { useRouter } from "next/router";
import { useSettings } from "@/app/contexts/settings-context";
import { textOverflow } from "@/shared/lib/string";
import { SEO } from "@/shared/ui/SEO";
import { PostTags } from "@/entities/post/ui/components/post-tags";
import { getSeoTitleByPath } from "@/shared/lib/seo";
import { PostBasePath } from "@/shared/types";

interface Props {
  post: PostProps;
  showComment?: boolean;
}

export const PostDetail = ({ post, showComment = false }: Props) => {
  const {
    id,
    title,
    excerpt,
    content,
    preview,
    commentCount,
    commentStatus,
    createdDate,
    createdTime,
    taxonomies,
    meta,
    seo,
    user,
  } = post;

  const components: Array<string | React.ReactNode> = content
    ? parseContent(content)
    : [];
  const views = meta?.views || null;
  const pollId = meta?.poll_id || null;
  const tags = taxonomies?.tags;
  const router = useRouter();
  const settings = useSettings();
  const basePath = router.asPath.split("/")[1];
  const href = `${settings.siteUrl}${router.asPath}`;
  const previewUrl = preview?.url
    ? `${settings.uploadUrl}/${preview?.url}`
    : "";

  const description = seo?.description
    ? seo.description
    : excerpt
    ? textOverflow(excerpt, 250)
    : undefined;

  return (
    <>
      <SEO
        title={getSeoTitleByPath(basePath as PostBasePath, title)}
        description={description}
        openGraph={{
          title,
          description,
          type: "article",
          url: href,
          image: {
            url: previewUrl,
            width: preview?.width,
            height: preview?.height,
            alt: preview?.alt || title,
          },
        }}
      />

      {preview && Object.keys(preview).length > 0 && (
        <div className="h-[260px] sm:h-[320px] lg:h-[460px] mb-5">
          <ImagePreview {...preview} />
        </div>
      )}
      {title && (
        <Heading className="text-grey-500 mb-5" tag="h1" title={title} />
      )}
      <PostMeta
        date={createdDate}
        time={createdTime}
        views={views}
        commentCount={commentCount}
      />
      {/* content parse */}
      <div className="content">
        {components &&
          components.map((component, index) => {
            if (typeof component === "string") {
              return (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: component }}
                />
              );
            } else if (typeof component === "object") {
              return <Fragment key={index}>{component}</Fragment>;
            }
          })}
      </div>
      <div className="flex flex-wrap">
        {/* poll */}
        {pollId && (
          <div className="w-full lg:w-[260px] lg:mr-8 mt-5">
            <PollView pollId={pollId} postId={id} />
          </div>
        )}
        <div className="w-full flex-1">
          {/* tags */}
          {tags && tags.length > 0 && (
            <div className="mt-5">
              <PostTags tags={tags} />
            </div>
          )}

          {/* author */}
          {user && (
            <div className="mt-5 text-grey-500">
              <strong>Автор:</strong> {user}
            </div>
          )}
          <div>
            <div className="mt-5 mb-1">
              <strong>Поделиться:</strong>
            </div>
            <ShareLinks
              url={href}
              title={title}
              text={excerpt ? excerpt : content ? textOverflow(content) : ""}
              imageUrl={previewUrl}
              customers={["ok", "telegram", "vk", "whatsapp"]}
            />
          </div>
        </div>
      </div>
      {/* comments */}
      {showComment && (
        <div className="mt-8">
          {commentStatus === "open" || Number(commentCount) > 0 ? (
            <h3 className="text-grey-500">Комментарии</h3>
          ) : null}
          {commentStatus === "open" && (
            <div className="mt-5">
              <CommentForm postId={id} />
            </div>
          )}
          {Number(commentCount) > 0 && (
            <div className="mt-5">
              <CommentList postId={id} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
