import { getGeneralSettings } from "@/shared/api/settings";
import { PostLayout } from "@/shared/ui/layouts";
import { ErrorStatus } from "@/shared/ui/error-status";
import { getPostsInterest } from "@/shared/api/posts";
import { type GetServerSideProps } from "next";
import { type PostProps } from "@/shared/types";

const ErrorPage = ({
  statusCode,
  interestNews,
}: {
  statusCode?: number;
  interestNews: PostProps[];
}) => {
  return (
    <PostLayout
      left={<ErrorStatus statusCode={statusCode} />}
      interestPosts={interestNews}
      showNewsWidgets={false}
      showAdvert={false}
      showPaper={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // check on old resource
  if (!process.env.OLD_HOST) {
    console.log("OLD_HOST is not set");
  }
  if (res.statusCode === 404 && process.env.OLD_HOST) {
    const checkUrl = `${process.env.OLD_HOST}${req.url}`;
    try {
      const responseOld = await fetch(checkUrl, { redirect: "follow" });
      if (responseOld.status === 200) {
        return {
          redirect: {
            permanent: false,
            destination: checkUrl,
          },
        };
      }
    } catch (e) {
      console.log(e);
    }
  }

  const { settings, taxonomies, advert } = await getGeneralSettings();
  let interestNews = null;
  try {
    interestNews = await getPostsInterest();
  } catch (error) {
    console.log("interest", error);
  }

  return {
    props: {
      statusCode: res.statusCode,
      interestNews,
      taxonomies,
      settings,
      advert,
    },
  };
};

export default ErrorPage;
