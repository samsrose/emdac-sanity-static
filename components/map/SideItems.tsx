import React from 'react';
import Link from "next/link"
import response from './response';

interface CountyDatum {
  id: string;
  transform: string;
  name: string;
  position: string;
  locale: string;
  countyName: string;
  uri?: string;
  fill: string;
  d: string;
}

interface CountyRegion {
  name: string;
  data: CountyDatum[];
}

const data: CountyRegion[] = response;

interface SideItemProps {
  data: CountyDatum[];
}

const SideItem = ({ data }: SideItemProps) => {
  const loopData = data.map((item, index) => {
    return (
      <Link key={index} href={item.uri ?? ""}>
        <h1 className="rounded-sm text-white hover:cursor-pointer">{item.countyName}</h1>
      </Link>
    )})
  return <>{loopData}</>
}


export default function SideItems() {
  const titles = data.map((item, index) => {
    return (
      <div key={index} className="grid grid-cols-2">
        {/* <h4 className='text-xl p-4'>{item.name}</h4> */}
        <div>
          <SideItem key={index} data={item.data} />
        </div>
      </div>
    )
  })
  return (
    <>
      {titles}
    </>
  )
}
