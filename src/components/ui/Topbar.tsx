import Image from "next/image";
import { ChevronDown } from "lucide-react";

function Topbar() {
  return (
    <div className="bg-white p-10 pb-3 flex justify-end items-center">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 hover:cursor-pointer rounded-full flex items-center justify-center">
          <Image
            src="/images/icons/bellIcon.png"
            width={18}
            height={21}
            alt="icon"
          />
        </div>
        <div className="border-r-1 border-border h-12 mx-4"></div>
        <div className="flex items-center">
          <div className="w-[46px] h-[46px] bg-background-highlight rounded-full flex items-center justify-center">
            <span className="text-lg text-secondary-font font-bold">PD</span>
          </div>

          <div className="py-3 px-[10px]">
            <p className="text-[10px] text-lite-font font-bold">Admin</p>

            <div className="flex gap-5 items-center">
              <p className="text-sm font-medium">Prerit Das</p>
              <ChevronDown className="text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
