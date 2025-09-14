import { usePathname } from "next/navigation";
import { useMemo } from "react";

// Configuration for route-based backgrounds
const routeBackgrounds = {
  "/": "bg-theme-bg-primary",
  "/login": "bg-theme-bg-primary",
  "/register": "bg-theme-bg-primary",
  "/content": "bg-theme-bg-secondary",
  default: "bg-theme-bg-primary",
};

export function useRouteBackground() {
  const pathname = usePathname();

  return useMemo(() => {
    return routeBackgrounds[pathname] || routeBackgrounds.default;
  }, [pathname]);
}
