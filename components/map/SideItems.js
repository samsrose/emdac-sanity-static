import React from 'react';
import Link from "next/link"
import response from './response';
const data = response;

const SideItem = ({ data }) => {
  const { id, name, countyName, position, locale, uri } = data;
  const loopData = data.map((item, index) => {
    return (
      <Link key={index} href={item.uri}>
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