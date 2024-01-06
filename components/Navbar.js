import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Brand from "./Brand";
import {
  ChevronDownIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  Bars3Icon,
  ClipboardDocumentListIcon,
  RectangleGroupIcon
} from "@heroicons/react/24/solid";

import Section from "./Section";
import FeatureIcon2 from "./FeatureIcon2";
import Button from "./Button";

function Navbar(props) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const linksData = [
    {
      title: 'California Medical Association',
      uri: '/links/calmedass.png',
      url: 'https://www.cmadocs.org/'
    },
    {
      title: 'Emergency Medical Services Administrators\' Association of California',
      uri: '/links/emsaac.jpeg',
      url: 'https://www.emsaac.org/'
    },
    {
      title: 'California Legislative Council',
      uri: '/links/LegislativeCounsel.jpeg',
      url: 'https://legislativecounsel.ca.gov/'
    },
    {
      title: 'Amierican College of Emergency Physicians',
      uri: '/links/acep.png',
      url: 'https://www.acep.org/'
    },
    {
      title: 'California Emergency Medical Services Authority',
      uri: '/links/calemsa.gif',
      url: 'https://emsa.ca.gov/'
    },
    {
      title: 'California Chapter, American College of Emergency Physicians',
      uri: '/links/logo.png',
      url: 'https://californiaacep.org/'
    },
    {
      title: 'National Association of EMS Physicians',
      uri: '/links/naemsp.jpeg',
      url: 'https://naemsp.org/'
    },
  ]

  const classes = {
    navLink:
      "text-gray-100 font-semibold inline-flex items-center space-x-1 h-8 px-4 group-hover:text-red-500 py-6",
    navLinkIcon:
      "transform transition duration-200 ease-out group-hover:rotate-180 inline-block w-4 h-4",
    dropdown: {
      base: "absolute top-19 pt-1 z-50 border-2 rounded-lg border-zinc-900 invisible group-hover:visible transform transition duration-800 ease-in opacity-0 group-hover:opacity-100",
      left: "right-0",
      center: "left-1/2 -translate-x-3/4",
      right: "left-0",
      normal: "w-48",
      large: "w-96",
      inner:
        "bg-gray-800 shadow-xl ring-1 z-10 ring-black ring-opacity-5 rounded-lg overflow-hidden",
      title:
        "md:text-sm uppercase font-semibold tracking-wider text-lg text-red-500 mb-1",
      link: "text-gray-100 hover:text-red-500 font-medium text-lg flex items-center space-x-2",
      mobileLink: "text-gray-100 hover:text-red-500 font-medium text-xl flex items-center space-x-2 space-y-4 py-2",
      icon: "opacity-25 inline-block w-5 h-5",
      feature:
        "p-3 rounded-xl flex items-center space-x-4 text-gray-300 font-medium text-sm",
      featureName: "font-semibold mb-1 text-xs",
      featureDescription: "opacity-75",
    },
    accountDropdown: {
      base: "absolute right-0 origin-top-right mt-2 w-48 z-50",
      inner:
        "bg-gray-900 ring-1 ring-black ring-opacity-5 rounded divide-y divide-gray-100 shadow-xl rounded",
      link: "flex items-center space-x-2 rounded py-2 px-3 text-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700",
      linkActive: "text-gray-700 bg-gray-100",
      linkInactive:
        "text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700",
      icon: "opacity-50 inline-block w-5 h-5",
    },
  };

  return (
    <Section bgColor={props.bgColor}>
      <div className="container py-6">
        <div className="flex justify-center">
          <Brand fill="#fff" width="160" className='lg:mb-2 lg:ml-12 sm:ml-48 ml-8 ml-0 cursor-pointer' />
          <div className="flex items-center ml-auto space-x-1 lg:space-x-4">
            <ul className="hidden lg:flex items-center ml-auto">
            <li className="relative group">
                <Link href="/lemsas" className={`${classes.navLink}`}>
                  <span>Local EMS Agencies</span>
                </Link>
              </li>
              <li className="relative group">
                <span className={`${classes.navLink}`} href="">
                  <span>Member Content</span>
                  <ChevronDownIcon className={classes.navLinkIcon} />
                </span>
                <div
                  className={`${classes.dropdown.base} ${classes.dropdown.large} ${classes.dropdown.center}`}
                >
                  <div className={`${classes.dropdown.inner}`}>
                    <div className="grid grid-cols-2">
                      <div className="p-6 space-y-6">
                        <h4 className={`${classes.dropdown.title}`}>Content Areas</h4>
                        <nav className="flex flex-col space-y-3">
                          <Link href="/meetings" className={`${classes.dropdown.link}`}>

                            Meetings

                          </Link>
                          <Link href="/directory" className={`${classes.dropdown.link}`}>

                            Directory

                          </Link>

                        </nav>
                      </div>
                      <div className="p-6 space-y-6">
                        <h4 className={`${classes.dropdown.title}`}>&nbsp;</h4>
                        <nav className="flex flex-col space-y-3">
                          <Link href="/documents" className={`${classes.dropdown.link}`}>

                            Documents

                          </Link>
                          <Link href="/committees" className={`${classes.dropdown.link}`}>

                            Committees

                          </Link>

                        </nav>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 bg-gray-700">
                      <nav className="p-6 flex flex-col space-y-4">
                        <Link href="/minutes" className={`${classes.dropdown.link}`}>

                          <ClipboardDocumentListIcon className={classes.dropdown.icon} />
                          <span className="text-xs">Meeting Minutes</span>

                        </Link>
                        <Link href="/protocols" className={`text-sm ${classes.dropdown.link}`}>

                          <RectangleGroupIcon className={classes.dropdown.icon} />
                          <span className="text-xs">Protocol Templates</span>

                        </Link>
                      </nav>
                      <nav className="p-6 flex flex-col space-y-4">
                        <Link href="/positions" className={`text-sm ${classes.dropdown.link}`}>

                          <DocumentTextIcon className={classes.dropdown.icon} />
                          <span className="text-xs">Position Papers</span>

                        </Link>
                        <Link href="/evidence" className={`text-sm ${classes.dropdown.link}`}>

                          <DocumentMagnifyingGlassIcon
                            className={classes.dropdown.icon}
                          />
                          <span className="text-xs">Evidence Reviews</span>

                        </Link>
                        <Link href="/legislative" className={`text-sm ${classes.dropdown.link}`}>

                          <ClipboardDocumentCheckIcon
                            className={classes.dropdown.icon}
                          />
                          <span className="text-xs">Legislative Reviews</span>

                        </Link>
                      </nav>
                    </div>
                  </div>
                </div>
              </li>
             
              <li className="relative group">
                <span className={`${classes.navLink}`} href="">
                  <span>EMS Links</span>
                  <ChevronDownIcon className={classes.navLinkIcon} />
                </span>
                <div
                  className={`${classes.dropdown.base} ${classes.dropdown.large} ${classes.dropdown.center}`}
                >
                  <div className={`${classes.dropdown.inner}`}>
                    <div className="p-3">
                      <div className="px-3 pt-3">
                        <h4 className={`${classes.dropdown.title}`}>
                          Related Agencies
                        </h4>
                        <h6 className="text-gray-200 text-sm mt-0 pt-0 pb-1">
                          External links to related agengies
                        </h6>
                        <div className="border-b border-2 mb-3 rounded-xl border-gray-700"/>
                      </div>
                      <nav className="flex flex-col space-y-1">
                        {linksData.map((item, index) => (
                          (<Link
                            key={index}
                            href={item.url}
                            target="_blank"
                            className="m-1 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-50">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-8 sm:w-8">
                                <Image src={item.uri} alt="county" width="50" height="50" />
                              </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-200">
                                {item.title}
                              </p>
                            </div>
                          </Link>)
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="flex lg:hidden items-center justify-center pr-8">
              <Button
                variant="simple"
                size="sm"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                endIcon={<Bars3Icon className="inline-block w-5 h-5" />}
              />
            </div>
          </div>
        </div>
        {/* Mobile dropdown */}
        <div className={"lg:hidden w-full" + (!mobileNavOpen ? " hidden" : "")}>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 my-4 bg-gray-800">
          <div className="p-8 space-y-6">
              <h4 className={`${classes.dropdown.title}`}>Content Areas</h4>
              <nav className="flex flex-col space-y-3">
                <Link href="/meetings" className={`${classes.dropdown.mobileLink}`}>
                  Meetings
                </Link>
                <Link href="/directory" className={`${classes.dropdown.mobileLink}`}>
                  Directory
                </Link>
                <Link href="/documents" className={`${classes.dropdown.mobileLink}`}>
                  Documents
                </Link>
                <Link href="/committees" className={`${classes.dropdown.mobileLink}`}>
                Committees
                </Link>
              </nav>
              {/* <h4 className={`${classes.dropdown.title}`}>&nbsp;</h4> */}
              <nav className="flex flex-col space-y-3">
              </nav>
            </div>
            <div className="col-span-2 p-3 space-y-6">
              <div className="px-3 pt-3">
                <h4 className={`${classes.dropdown.title}`}>
                  Related Agencies
                </h4>
                <h6 className="text-gray-200 text-sm mt-0 pt-0 pb-4">
                  External links to related agengies
                </h6>
                <div className="border-b border-4 rounded-xl border-gray-700"/>
              </div>
              <nav className="flex flex-col space-y-1">
                {linksData.map((item, index) => (
                  (<Link
                    key={index}
                    href={item.url}
                    className="m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-50">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">

                      <Image src={item.uri} alt="county" width="75" height="75" />
                    </div>
                    <div className="ml-4">
                      <p className={`${classes.dropdown.mobileLink} md:text-lg text-sm font-medium text-gray-200`}>
                        {item.title}
                      </p>
                    </div>

                  </Link>)
                ))}
              </nav>
            </div>
           
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Navbar;
