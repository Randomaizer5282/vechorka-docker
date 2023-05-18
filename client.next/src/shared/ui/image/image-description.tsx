import React from "react";
import cn from "clsx";

interface Props {
  description: string;
  className: string;
}

export const ImageDescription = ({ description, className }: Props) => {
  if (!description) return null;
  return (
    <div
      className={cn(
        className,
        "absolute top-0 w-full p-2 bg-black/50 text-grey-200 text-14px"
      )}
    >
      {description}
    </div>
  );
};
