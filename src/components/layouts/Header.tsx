import Champion from "@/components/icons/champion.svg?react";
import Synergy from "@/components/icons/synergy.svg?react";
import { cn } from "@/libs/utils";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
const navs = [
  {
    key: "champions",
    title: "英雄",
    icon: <Champion />,
    url: "/champions",
  },
  {
    key: "synergy",
    title: "羁绊",
    icon: <Synergy />,
    url: "/synergy",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const currentNav = useMemo(() => {
    return navs.find((nav) => nav.url === pathname);
  }, [pathname]);

  return (
    <header className="bg-[#201f59] sticky top-0 z-50">
      <div className="mx-auto container py-2 ">
        <div className="flex divide-x divide-slate-500">
          {navs.map((nav) => (
            <Link
              to={nav.url}
              key={nav.key}
              className={cn(
                "flex gap-2 px-4 items-center",
                currentNav?.url === nav.url ? "text-yellow-400" : "text-white"
              )}
            >
              <div
                className={cn(
                  currentNav?.url === nav.url ? "fill-yellow-400" : "fill-white"
                )}
              >
                {nav.icon}
              </div>
              <span>{nav.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
