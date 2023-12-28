import { getGeneralSettings } from "@/shared/api/settings";
import { PostLayout } from "@/shared/ui/layouts";
import { ErrorStatus } from "@/shared/ui/error-status";
import { type GetServerSideProps } from "next";
import { useEffect } from "react";
import { useSettings } from "@/contexts/settings-context";
import { fetchWithTimeout } from "@/shared/api";

const ErrorPage = ({ statusCode }: { statusCode?: number }) => {
  const { setSettings } = useSettings();

  useEffect(() => {
    const fetchSettings = async () => {
      const { settings, taxonomies } = await getGeneralSettings({
        withTaxonomies: true,
      });

      if (setSettings) {
        setSettings({ ...settings, taxonomies });
      }
    };

    fetchSettings();
  }, []);

  return (
    <PostLayout
      left={<ErrorStatus statusCode={statusCode} />}
      showNewsWidgets={false}
      showAdvert={false}
      showPaper={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  console.log(`--------------------------------------`);
  console.log(`error page: ${res.statusCode} | ${req.url}`);
  console.log(req.headers["user-agent"]);
  const checkUrl = `${process.env.OLD_HOST}${req.url}`;

  if (res.statusCode === 404 && process.env.OLD_HOST) {
    try {
      const response: any = fetchWithTimeout(
        checkUrl,
        { redirect: "follow" },
        4000
      );

      if (response?.status === 200) {
        console.log(`redirect to: ${checkUrl}`);
        return {
          redirect: {
            permanent: true,
            destination: checkUrl,
          },
        };
      }
    } catch (e) {
      console.log("old host: not found");
    }
  }

  return {
    props: {
      statusCode: res.statusCode,
    },
  };
};

export default ErrorPage;
