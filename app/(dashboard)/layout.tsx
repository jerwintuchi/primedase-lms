import { Navbar } from "./_components/navbar";
import RuneBg from "./_components/rune-bg";
import Sidebar from "./_components/sidebar";
//import "./globals.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <RuneBg />
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-fit flex min-h-screen bg-white">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
