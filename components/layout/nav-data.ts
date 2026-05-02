export interface NavLink {
  href: string;
  label: string;
}

export interface ExternalLink {
  title: string;
  uri: string;
  url: string;
}

export const memberLinks: NavLink[] = [
  { href: "/meetings", label: "Meetings" },
  { href: "/directory", label: "Directory" },
  { href: "/documents", label: "Documents" },
  { href: "/committees", label: "Committees" },
];

export const externalLinks: ExternalLink[] = [
  {
    title: "California Medical Association",
    uri: "/links/calmedass.png",
    url: "https://www.cmadocs.org/",
  },
  {
    title: "Emergency Medical Services Administrators' Association of California",
    uri: "/links/emsaac.jpeg",
    url: "https://www.emsaac.org/",
  },
  {
    title: "California Legislative Council",
    uri: "/links/LegislativeCounsel.jpeg",
    url: "https://legislativecounsel.ca.gov/",
  },
  {
    title: "American College of Emergency Physicians",
    uri: "/links/acep.png",
    url: "https://www.acep.org/",
  },
  {
    title: "California Emergency Medical Services Authority",
    uri: "/links/calemsa.gif",
    url: "https://emsa.ca.gov/",
  },
  {
    title: "California Chapter, American College of Emergency Physicians",
    uri: "/links/logo.png",
    url: "https://californiaacep.org/",
  },
  {
    title: "National Association of EMS Physicians",
    uri: "/links/naemsp.jpeg",
    url: "https://naemsp.org/",
  },
];

export const navStyles = {
  navLink:
    "text-gray-100 font-semibold inline-flex items-center space-x-1 h-8 px-4 group-hover:text-red-500 py-6",
  dropdownPanel:
    "absolute top-19 pt-1 z-50 border rounded border-zinc-900 invisible group-hover:visible transform transition duration-200 ease-in opacity-0 group-hover:opacity-100 left-1/2 -translate-x-3/4 w-96",
  dropdownInner:
    "bg-gray-800 shadow-xl ring-1 z-10 ring-black ring-opacity-5 rounded-lg overflow-hidden",
  dropdownTitle:
    "md:text-sm uppercase font-semibold tracking-wider text-lg text-red-500 mb-1",
  dropdownLink:
    "text-gray-100 hover:text-red-500 font-medium text-lg flex items-center space-x-2",
  mobileLink:
    "text-gray-100 hover:text-red-500 font-medium text-xl flex items-center space-x-2 space-y-4 py-2",
} as const;
