"use-client";
import { Compass, Layout } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    Icon: Layout, // Use the updated prop name "Icon"
    label: "Dashboard",
    href: "/",
  },
  {
    Icon: Compass, // Use the updated prop name "Icon"
    label: "Browse",
    href: "/search",
  },
];

export const SidebarRoutes = () => {
  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
        /*
          key={route.href}
          icon={<route.Icon />}
          label={route.label}
          href={route.href}*/
        />
      ))}
    </div>
  );
};
