import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SettingsProvider } from "@/contexts/settings-context";
import { Head } from "@/shared/ui/head";
import { Layout } from "@/shared/ui/layouts";

function MyApp({ Component, pageProps }: AppProps) {
  const { settings, taxonomies, advert } = pageProps;
  return (
    <>
      <NextNProgress
        color="#154291"
        height={1}
        options={{ showSpinner: false }}
      />
      <SettingsProvider value={{ ...settings, taxonomies, advert }}>
        <Head />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
    </>
  );
}

export default MyApp;
