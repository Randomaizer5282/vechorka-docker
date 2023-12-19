import type { NextApiRequest, NextApiResponse } from "next";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key, id, type } = req.query;

  if (
    !process.env.CLIENT_SECRET ||
    key !== process.env.CLIENT_SECRET ||
    (!id && !type)
  ) {
    return res.status(401).json({ message: "Bad request: invalid token" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    post: {
      id,
      type,
    },
  });

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/preview/${id}` });
  res.end();
}
