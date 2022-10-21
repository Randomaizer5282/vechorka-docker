import { api } from "@/shared/api/core";
import { encodeQueryData } from "@/shared/lib/helpers";

interface GetCommentParams {
  offset?: number;
  limit?: number;
}

export const getCommentByPostId = (
  postId: number,
  params?: GetCommentParams
) => {
  const queryParams = encodeQueryData(params);
  return api.get(
    `comments?postId=${postId}${queryParams ? `&${queryParams}` : ""}`
  );
};
