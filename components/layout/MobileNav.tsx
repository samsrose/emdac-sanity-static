"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils/cn";
import { externalLinks, memberLinks, navStyles } from "./nav-data";

/**
 * Client-only burger toggle + sliding panel. This is the only piece of
 * navigation that requires JavaScript on the page.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-3 py-2 text-gray-800 hover:bg-gray-100"
      >
        {open ? (
          <XMarkIcon className="inline-block w-5 h-5" />
        ) : (
          <Bars3Icon className="inline-block w-5 h-5" />
        )}
      </button>

      {open && (
        <div className="w-full mt-4">
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 bg-gray-800">
            <div className="p-8 space-y-6">
              <h2 className={navStyles.dropdownTitle}>Content Areas</h2>
              <nav className="flex flex-col space-y-3">
                {memberLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={navStyles.mobileLink}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="col-span-2 p-3 space-y-6">
              <div className="px-3 pt-3">
                <h2 className={navStyles.dropdownTitle}>Related Agencies</h2>
                <p className="text-gray-200 text-sm mt-0 pt-0 pb-4">
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
                    className="m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-900"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                      <Image src={item.uri} alt="" width={75} height={75} />
                    </div>
                    <div className="ml-4">
                      <p
                        className={cn(
                          navStyles.mobileLink,
                          "md:text-lg text-sm font-medium text-gray-200",
                        )}
                      >
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
