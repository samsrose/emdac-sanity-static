import React from "react";
import Link from "next/link";
import response from "../components/map/response";
const data = response;

const datas = {
  Officers: [
    { name: "Kathy Staats, MD", role: "Central California EMS" },
    { name: "Dustin Ballard, MD", role: "Mountain Valley EMS" },
    { name: "Zita Konick, MD", role: "Inland County EMS" },
    { name: "Daniel Shepherd, MD", role: "North Coast EMS" },
    { name: "Nichole Bosson, MD", role: "Northern California EMS" },
    { name: "John Rose, MD", role: "Sierra-Sacramento EMS" },
  ],
  "County-based EMS Agencies": [
    "Ken Miller",
    "Kevin Mackey",
    "Kimberly Freeman",
    "Atilla Uner",
    "Nichole Bosson",
    "Eric Rudnick",
    "Marc Gautreau",
  ],
};

export default function Lemsas() {
  return (
    <>
      <div className="flex flex-wrap sm:mx-auto pt-12 pb-12 px-2">
        <div className="my-8 max-w-xl pr-4 text-center mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">
            California LEMSAs
          </h2>
          <span className="text-red-500 text-xl font-normal">
            Expand each county for more information
          </span>
        </div>
      </div>
      <section className="text-gray-100 body-font lg:w-2/3 w-full px-4 mb-24 relative container-fluid px-4 mx-auto h-screen flex">
        <ul className="w-full">
          <CountyMobile data={response} />
        </ul>
      </section>
    </>
  );
}

function Tooltip({ title, children }) {
  return (
    <>
  <div className="tooltip tooltip-right" data-tip={`${title}`}>
    {children}
  </div>
  </>
  )
}

function Dropdown({
  title,
  backgroundFill,
  name,
  position,
  locale,
  uri,
  index,
}) {
  return (
    <>
      <div
        key={index}
        className="collapse rounded my-1"
        style={{ backgroundColor: `${backgroundFill}` }}
      >
        <input type="checkbox" />
        <div className="collapse-title text-md font-medium flex align-center justify-between">
          <span className="my-1 text-lg">{title}</span>
        </div>
        <div className="collapse-content">
          <p className="text-md">{name}</p>
          <p className="text-md">{position}</p>
          <p className="text-md mb-2">{locale}</p>
          <Tooltip title="Click to open link in new window">
            <Link href={uri} target="_blank" className="py-1 text-sm border-b border-b-2">
              Link to agency
            </Link>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

const CountyItem = ({ data }) => {
  const { id, name, countyName, position, locale, uri } = data;
  const loopData = data.map((item, index) => {
    return (
      <Dropdown
        key={index}
        backgroundFill={item.fill}
        className={
          item.fill === "#ddd"
            ? `p-1 my-1 rounded hover:cursor-pointer text-black`
            : `p-1 my-1 rounded hover:cursor-pointer text-white`
        }
        title={item.countyName}
        name={item.name}
        position={item.position}
        locale={item.locale}
        uri={item.uri}
      />
    );
  });
  return <>{loopData}</>;
};

function CountyMobile() {
  const titles = data.map((item, index) => {
    return (
      <div
        key={index}
        className="border border-1 border-gray-500 rounded p-4 grid grid-cols-2 my-4"
      >
        <h4 className="text-xl font-medium p-4">{item.name}</h4>
        <div>
          <CountyItem index={index} data={item.data} />
        </div>
      </div>
    );
  });
  return <>{titles}</>;
}
