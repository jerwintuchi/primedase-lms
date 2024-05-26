import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SidebarItemProps } from "./sidebar-routes";
import "../../../app/globals.css";
export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") || // If we are on the root page
    pathname === href || // For checking if we're on the exact same page
    pathname?.startsWith(`${href}/`); // For specific cases where we can be in a subroute of a specific route

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-purple-900 text-sm font-semibold pl-6 transition-all hover:text-black-600 hover:bg-purple-300",
        isActive &&
          "text-purple-900 bg-purple-200 hover:bg-purple-200 hover:text-purple-700 border-l-8 border-purple-900" // Add transition class here
      )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-purple-800", isActive && "text-purple-800")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full transition-all", // Remove opacity manipulation
          isActive && "border-purple-500 " // Add border on active state
        )}
      />
    </button>
  );
};
