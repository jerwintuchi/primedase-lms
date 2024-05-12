"use client";
import { BarChart, BarChart2Icon, Compass, Layout, List, ListCollapse, ListFilter, ListXIcon, TableProperties } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

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

const teacherRoutes = [
  {
    Icon: TableProperties, // Use the updated prop name "Icon"
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    Icon: BarChart2Icon, // Use the updated prop name "Icon"
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.Icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
