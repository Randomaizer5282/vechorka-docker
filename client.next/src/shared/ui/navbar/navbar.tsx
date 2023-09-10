import React from "react";
import { Container } from "@/shared/ui/container";
import { useSettings } from "@/app/contexts/settings-context";
import { Logo } from "@/shared/ui/logo";
import { SearchForm } from "@/modules/search/ui/search-form";
import { Nav } from "@/shared/ui/navigation/nav";
import { NavMobile } from "@/shared/ui/navigation/nav-mobile";
import { menuHomeItem } from "@/shared/config";

export const Navbar = () => {
  const { menus } = useSettings();

  return (
    <div className="fixed w-full min-w-[220px] h-navbar-sm md:h-navbar-md bg-white z-20">
      <Container className="h-full">
        <div className="relative flex items-center h-full border-b-2 border-blue-300">
          {/* logo */}
          <div className="relative flex-shrink-0 h-[35px] md:h-[49px] w-[116px] md:w-[166px] transition-all">
            <Logo priority />
          </div>

          {/* wrapper */}
          <div className="flex h-full w-full items-center justify-end xl:justify-between">
            {/* menu */}
            <div className="hidden xl:flex flex-1 items-center px-12">
              {menus?.main && <Nav menu={menus.main} />}
            </div>

            {/* search */}
            <div className="hidden md:flex justify-end w-[310px] h-[30px]">
              <SearchForm />
            </div>

            {/* mobile */}
            <div className="flex xl:hidden items-center">
              {menus?.main && (
                <NavMobile menu={[menuHomeItem, ...menus.main]} />
              )}
            </div>
          </div>
          <a
            className="absolute -bottom-4 md:-bottom-3 left-0 px-3 py-1 border text-10px bg-blue-100 text-white hover:bg-blue-300 hover:text-white z-10"
            href={process.env.OLD_HOST}
          >
            Старая версия
          </a>
        </div>
      </Container>
    </div>
  );
};
