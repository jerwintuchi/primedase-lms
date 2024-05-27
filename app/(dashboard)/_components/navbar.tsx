import NavbarRoutes from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    //NAVBAR WITH THE AVATARBOX
    <div className="p-4 border-b h-full flex items-center bg-red-700 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
