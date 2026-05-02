import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { externalLinks, memberLinks, navStyles } from "./nav-data";

/**
 * Desktop navigation. Pure server component — the dropdown panels are
 * implemented with `group-hover` CSS, so no JavaScript ships for this UI.
 */
export function DesktopNav() {
  return (
    <ul className="hidden lg:flex items-center ml-auto">
      <li className="relative group">
        <Link href="/lemsas" className={navStyles.navLink}>
          <span>Local EMS Agencies</span>
        </Link>
      </li>

      <li className="relative group">
        <span className={navStyles.navLink}>
          <span>Member Content</span>
          <ChevronDownIcon className="w-4 h-4 transform transition duration-200 ease-out group-hover:rotate-180" />
        </span>
        <div className={navStyles.dropdownPanel}>
          <div className={navStyles.dropdownInner}>
            <div className="grid grid-cols-2">
              <NavColumn title="Content Areas" links={memberLinks.slice(0, 2)} />
              <NavColumn title="" links={memberLinks.slice(2)} />
            </div>
          </div>
        </div>
      </li>

      <li className="relative group">
        <span className={navStyles.navLink}>
          <span>EMS Links</span>
          <ChevronDownIcon className="w-4 h-4 transform transition duration-200 ease-out group-hover:rotate-180" />
        </span>
        <div className={navStyles.dropdownPanel}>
          <div className={navStyles.dropdownInner}>
            <div className="p-3">
              <div className="px-3 pt-3">
                <h2 className={navStyles.dropdownTitle}>Related Agencies</h2>
                <p className="text-gray-400 text-sm mt-0 pt-0 pb-1">
                  External links to related agencies
                </p>
              </div>
              <nav className="flex flex-col space-y-1">
                {externalLinks.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m-1 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-700"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-8 sm:w-8">
                      <Image src={item.uri} alt="" width={50} height={50} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-200">{item.title}</p>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

function NavColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="p-6 space-y-6">
      <h2 className={navStyles.dropdownTitle}>{title || "\u00A0"}</h2>
      <nav className="flex flex-col space-y-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={navStyles.dropdownLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
