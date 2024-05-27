import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
        <div className="p-4">Your Rank is (chuchuchu)</div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
      </div>
      <div>
        <div className="flex flex-items-center justify-center">
          <Logo />
          <div className="mt-auto mb-auto text-size-xs text-red-700 font-bold">
            © 2024 Grimoire.
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Sidebar;
