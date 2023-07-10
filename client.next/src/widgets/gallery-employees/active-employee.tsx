import type { PostProps } from "@/shared/types";
import NextImage from "next/image";
import { settings } from "@/shared/config";

export const ActiveEmployee = ({ employee }: { employee: PostProps }) => {
  const src =
    employee.preview?.sizes?.medium?.url || employee.preview?.url || null;
  const fullName = employee.meta?.full_name;
  const role = employee.meta?.role;
  const bio = employee.meta?.bio;
  const alt = employee.preview?.caption || employee.preview?.description || "";

  return (
    <div className="mt-10 p-5 lg:p-10 md:flex bg-grey-100">
      {src && (
        <div className="relative md:flex-1 max-w-[260px] h-[260px] mx-auto md:mx-0 md:mr-5">
          <NextImage
            src={`${settings.uploadUrl}/${src}`}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            alt={alt}
          />
        </div>
      )}
      <div className="flex-1">
        {fullName && (
          <h3 className="mt-3 md:mt-0 text-center md:text-left">{fullName}</h3>
        )}
        {role && (
          <p className="mt-3 text-center md:text-left text-13px text-grey-500">
            {role}
          </p>
        )}
        {bio && <p className="mt-5 text-sm-10 text-grey-500">{bio}</p>}
      </div>
    </div>
  );
};
