import { Brand } from "./Brand";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils/cn";

interface NavbarProps {
  bgColor?: string;
}

/**
 * Navbar shell. Server component — only the burger toggle in MobileNav
 * carries any JavaScript to the client.
 */
export function Navbar({ bgColor = "bg-gray-800" }: NavbarProps) {
  return (
    <header className={cn("section relative", bgColor)}>
      <div className="container py-6 mx-auto px-4">
        <div className="flex justify-center items-center">
          <Brand
            fill="#fff"
            width={160}
            className="lg:mb-2 lg:ml-12 sm:ml-48 ml-8 cursor-pointer"
          />
          <div className="flex items-center ml-auto space-x-1 lg:space-x-4">
            <DesktopNav />
            <div className="flex items-center justify-center pr-8 lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
