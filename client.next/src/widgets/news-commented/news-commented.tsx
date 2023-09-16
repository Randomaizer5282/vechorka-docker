import { PostMeta } from "@/modules/post/ui/components/post-meta";
import { Heading } from "@/shared/ui/heading";
import { PostListWidget } from "@/widgets/post-list-widget";
import { type PostProps } from "@/shared/types";

export interface NewsCommentedProps {
  posts: PostProps[];
  className?: string;
}

export const NewsCommented = ({ className, posts }: NewsCommentedProps) => {
  return (
    <PostListWidget
      posts={posts}
      className={className}
      title="Комментируют"
      view={({ post, href }) => (
        <>
          <div>
            {/* meta */}
            <PostMeta
              className="justify-between"
              date={
                post.comments?.length ? post.comments[0].createdDate : undefined
              }
              time={
                post.comments?.length ? post.comments[0].createdTime : undefined
              }
            />
            {/* title */}
            {post.title && (
              <Heading
                title={post.title}
                href={href}
                tag="h6"
                className="pt-2 text-line-clamp-3"
              />
            )}
          </div>
        </>
      )}
    />
  );
};
