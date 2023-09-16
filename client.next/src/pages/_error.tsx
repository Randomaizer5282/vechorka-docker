import { getGeneralSettings } from "@/shared/api/settings";
import { PostLayout } from "@/shared/ui/layouts";
import { ErrorStatus } from "@/shared/ui/error-status";
import { type GetServerSideProps } from "next";

const ErrorPage = ({ statusCode }: { statusCode?: number }) => {
  return (
    <PostLayout
      left={<ErrorStatus statusCode={statusCode} />}
      // interestPosts={interestNews}
      showNewsWidgets={false}
      showAdvert={false}
      showPaper={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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

  const { settings, taxonomies } = await getGeneralSettings({
    withTaxonomies: true,
  });

  return {
    props: {
      statusCode: res.statusCode,
      taxonomies,
      settings,
    },
  };
};

export default ErrorPage;
