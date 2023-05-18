import React from "react";
import { GalleryByIds } from "@/widgets/gallery-by-ids";
import { ImageContent } from "@/shared/ui/image";
import cn from "clsx";

export const parseContent = (body: string) => {
  body = replaceBlockquote(body);
  body = body.replace(/\t|\s\t/gi, "");

  const blocks = body?.split("\r\n");
  const components: Array<string | React.ReactNode> = [];
  let indexComponentType = 0;

  blocks?.length > 0 &&
    blocks.map((block) => {
      if (block) {
        const component = parseBlock(block);
        // html markup
        if (typeof component === "string") {
          if (!components[indexComponentType]) {
            components[indexComponentType] = component;
          } else {
            components[indexComponentType] += component;
          }
        }
        // react component
        if (typeof component === "object") {
          components[++indexComponentType] = component;
          indexComponentType++;
        }
      }
    });
  return components;
};

const parseToComponent = (block: string) => {
  // gallery
  if (block.match(/\[gallery/is)) {
    return createGallery(block);
  }

  if (block.match(/^.*<img/gim)) {
    return createImage(block);
  }

  return null;
};

const parseBlock = (block: string) => {
  let element: React.ReactNode = null;
  const tagsAllow = block?.match(/<(strong|em).+?>/gim);
  const isTag = block.match(/^<.+>/gi);

  if (block) {
    element = parseToComponent(block);
  }

  if (!element && tagsAllow) {
    element = `<p>${block.trim()}</p>`;
  }

  if (!element && !isTag) {
    element = `<p>${block.trim()}</p>`;
  }

  return element ?? block;
};

const createGallery = (body: string) => {
  const idsRegex = /\[gallery.+ids=\\?"([\d,]+)\\?"/im;
  const colsRegex = /\[gallery.+columns=\\?"([\d]+)\\?"/im;
  const titleRegex = /\[gallery.+title=\\?"([\w\s\S].+?)\\?"/im;

  const matchIds = body.match(idsRegex);
  const matchCols = body.match(colsRegex);
  const matchTitle = body.match(titleRegex);

  const ids = matchIds && matchIds[1] ? matchIds[1] : null;
  const cols = matchCols && matchCols[1] ? matchCols[1] : 3;
  const title = matchTitle && matchTitle[1] ? matchTitle[1] : "";

  if (ids) {
    return <GalleryByIds ids={ids} title={title} perView={cols as number} />;
  }

  return null;
};

const createImage = (image: string) => {
  const matchSrc = image.match(/<img.+src="(.*?)"/im);
  const matchAlt = image.match(/<img.+alt="(.*?)"/im);
  const matchWidth = image.match(/<img.+width="(.*?)"/im);
  const matchHeight = image.match(/<img.+height="(.*?)"/im);
  const matchImageClass = image.match(/<img.+class="(.*?)"/im);
  const matchFull = image.match(/<a.+href="(.+?)".+<img/im);
  const matchCaption = image.match(
    /\[caption.+<img.+[\/>|</](.+)\[\/caption\]/im
  );
  const matchCaptionClass = image.match(/\[caption.+align="(.*?)"/im);

  const src = matchSrc && matchSrc[1] ? matchSrc[1] : null;
  const alt = matchAlt && matchAlt[1] ? matchAlt[1] : null;
  const width = matchWidth && matchWidth[1] ? matchWidth[1] : null;
  const height = matchHeight && matchHeight[1] ? matchHeight[1] : null;
  const fullSrc = matchFull && matchFull[1] ? matchFull[1] : null;
  const caption = matchCaption && matchCaption[1] ? matchCaption[1] : null;
  const imageClassName =
    matchImageClass && matchImageClass[1] ? matchImageClass[1] : null;
  const captionClassName =
    matchCaptionClass && matchCaptionClass[1] ? matchCaptionClass[1] : null;

  // if isset caption, get align from caption
  // else get class from img
  const className = captionClassName ?? imageClassName;

  if (src) {
    return (
      <ImageContent
        caption={caption ?? ""}
        alt={alt}
        src={src}
        width={width}
        height={height}
        fullSrc={fullSrc}
        className={cn(className, "my-3")}
      />
    );
  }

  return null;
};

const replaceBlockquote = (body: string) => {
  return body?.replace(
    /<blockquote>(.*)<\/blockquote>/g,
    `<blockquote><svg viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
    </svg>$1</blockquote>`
  );
};
