import React, { ReactNode } from "react";

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export const LayoutColumn = ({ left, right }: Props) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap mt-5 lg:mt-8">
      {/* left column */}
      <div className="w-full md:flex-1 md:mr-6 overflow-hidden">{left}</div>

      {/* right column */}
      <div className="w-full md:w-[300px]">{right}</div>
    </div>
  );
};
