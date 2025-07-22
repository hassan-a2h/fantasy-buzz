import Providers from "../Providers";
import Topbar from "@/components/ui/Topbar";
import Sidebar from "@/components/ui/Sidebar";

function ContestsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex-1 p-6 pr-12 overflow-auto">{children}</div>
        </div>
      </div>
    </Providers>
  );
}

export default ContestsLayout;
