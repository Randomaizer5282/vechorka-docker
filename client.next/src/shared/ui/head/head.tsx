import { SEO } from "@/shared/ui/SEO";

export const Head = () => {
  return (
    <SEO>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        key="viewport"
      />
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
        key="apple-icon-57x57"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/favicon/apple-icon-60x60.png"
        key="apple-icon-60x60"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/favicon/apple-icon-72x72.png"
        key="apple-icon-72x72"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicon/apple-icon-76x76.png"
        key="apple-icon-76x76"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/favicon/apple-icon-114x114.png"
        key="apple-icon-114x114"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/favicon/apple-icon-120x120.png"
        key="apple-icon-120x120"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/favicon/apple-icon-144x144.png"
        key="apple-icon-144x144"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/favicon/apple-icon-152x152.png"
        key="apple-icon-152x152"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-icon-180x180.png"
        key="apple-icon-180x180"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicon/android-icon-192x192.png"
        key="android-icon-192x192"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
        key="favicon-32x32"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon/favicon-96x96.png"
        key="favicon-96x96"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
        key="favicon-16x16"
      />
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
      <link rel="manifest" href="/favicon/manifest.json" key="site-manifest" />

      {process.env.NODE_ENV === "production" && (
        <>
          {/*Global site tag (gtag.js) - Google Analytics*/}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-19569293-1"
            key="googletagmanager"
          />
          <script
            id="google-analytics"
            key="google-analytics"
            async
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-19569293-1');
          `,
            }}
          />
          {/*Global site tag (gtag.js) - Google Analytics*/}

          {/*<script*/}
          {/*  data-ad-client="ca-pub-7747485869102419"*/}
          {/*  key="googlesyndication"*/}
          {/*  async*/}
          {/*  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"*/}
          {/*/>*/}

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

          {/*Top100 (Kraken) Counter*/}
          <script
            key="kraken"
            async
            dangerouslySetInnerHTML={{
              __html: `(function (w, d, c) {
          (w[c] = w[c] || []).push(function() {
          var options = {
          project: 2244361,
          element: 'top100_widget',
          trackHashes: true,
          user_id: null,
          };
          try {
            w.top100Counter = new top100(options);
          } catch(e) { }
        });
        var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src =
        (d.location.protocol == "https:" ? "https:" : "http:") + "//st.top100.ru/top100/top100.js";

        if (w.opera == "[object Opera]") {
          d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
        })(window, document, "_top100q");`,
            }}
          />
          {/*Top100 (Kraken) Counter*/}

          {/*Rating Mail.ru counter*/}
          <script
            key="rating-mail.ru"
            async
            dangerouslySetInnerHTML={{
              __html: `var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3236132", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
            if (d.getElementById(id)) return;
            var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
            ts.src = "https://top-fwz1.mail.ru/js/code.js";
            var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
            if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "topmailru-code");`,
            }}
          />

          <noscript
            key="rating-mail-no-script"
            dangerouslySetInnerHTML={{
              __html: `<div><img src="https://top-fwz1.mail.ru/counter?id=3236132;js=na" style="border:0;position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>`,
            }}
          />
          {/*Rating Mail.ru counter*/}

          <noscript
            key="counter.rambler.ru"
            dangerouslySetInnerHTML={{
              __html: `<img src="//counter.rambler.ru/top100.cnt?pid=2244361" alt="Топ-100" />`,
            }}
          />
        </>
      )}
    </SEO>
  );
};
