import { default as NextHead } from "next/head";

export const Head = () => {
  return (
    <NextHead>
      {/*<meta*/}
      {/*  name="viewport"*/}
      {/*  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"*/}
      {/*  key="viewport"*/}
      {/*/>*/}
      <link
        rel="preload"
        href="/fonts/raleway/raleway-v28-latin_cyrillic-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
        key="ralewayRegular"
      />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/favicon/apple-icon-57x57.png"
        key="icon-57x57"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/favicon/apple-icon-60x60.png"
        key="icon-60x60"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/favicon/apple-icon-72x72.png"
        key="icon-72x72"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicon/apple-icon-76x76.png"
        key="icon-76x76"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/favicon/apple-icon-114x114.png"
        key="icon-114x114"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/favicon/apple-icon-120x120.png"
        key="icon-120x120"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/favicon/apple-icon-144x144.png"
        key="icon-144x144"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/favicon/apple-icon-152x152.png"
        key="icon-152x152"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-icon-180x180.png"
        key="icon-180x180"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicon/android-icon-192x192.png"
        key="icon-192x192"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
        key="icon-32x32"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon/favicon-96x96.png"
        key="icon-96x96"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
        key="icon-16x16"
      />
      <link rel="manifest" href="/favicon/manifest.json" key="manifest" />
      <meta
        name="msapplication-TileColor"
        content="#ffffff"
        key="msapplication-TileColor"
      />
      <meta
        name="msapplication-TileImage"
        content="/favicon/ms-icon-144x144.png"
        key="msapplication-TileImage"
      />
      <meta name="theme-color" content="#ffffff" key="theme-color" />

      {process.env.NODE_ENV === "production" && (
        <>
          {/*Google tag (gtag.js)*/}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-HK4BNMN6QL"
            key="googletagmanager"
          />
          <script
            key="gtag"
            async
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-HK4BNMN6QL');
          `,
            }}
          />
          {/*Google tag (gtag.js)*/}

          {/*Yandex.Metrika counter*/}
          <script
            key="yandex-metrika"
            async
            dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(82994833, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true});`,
            }}
          />
          <noscript
            key="yandex-metrika-noscript"
            dangerouslySetInnerHTML={{
              __html: `<div><img src="https://mc.yandex.ru/watch/82994833" style="position:absolute; left:-9999px;" alt="" /></div>`,
            }}
          />
          {/*Yandex.Metrika counter*/}

          {/*LiveInternet counter*/}
          <script
            key="counter-yadro"
            async
            dangerouslySetInnerHTML={{
              __html: `new Image().src = "https://counter.yadro.ru/hit?r"+
            escape(document.referrer)+((typeof(screen)=="undefined")?"":
            ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
            screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
            ";h"+escape(document.title.substring(0,150))+
            ";"+Math.random();`,
            }}
          />
          {/*LiveInternet counter*/}
        </>
      )}
    </NextHead>
  );
};
