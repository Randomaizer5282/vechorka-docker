import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SettingsProvider } from "@/contexts/settings-context";
import { Head } from "@/shared/ui/head";
import { Layout } from "@/shared/ui/layouts";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const { settings, taxonomies } = pageProps;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            // staleTime: 60000,
            // cacheTime: 1000,
          },
        },
      })
  );

  return (
    <>
      <NextNProgress
        color="#154291"
        height={1}
        options={{ showSpinner: false }}
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SettingsProvider value={{ ...settings, taxonomies }}>
            <Head />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SettingsProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
