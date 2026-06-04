import React from 'react';
import Link from "next/link"
import response from './map/response';
const data = response;

interface CountyEntry {
    id: string;
    transform: string;
    name: string;
    position: string;
    locale: string;
    countyName: string;
    uri: string;
    fill: string;
    d: string;
}

interface CountyItemProps {
    data: CountyEntry[];
}

const CountyItem = ({ data }: CountyItemProps) => {
    const { id, name, countyName, position, locale, uri } = data as unknown as Partial<CountyEntry>;
    const loopData = data.map((item, index) => {
        return (
            <Link key={index} href={item.uri} legacyBehavior>
                <h1 style={{ backgroundColor: item.fill }} className={item.fill === '#ddd' ? `p-2 my-2 rounded-sm hover:cursor-pointer text-black` : `p-2 my-2 rounded-sm hover:cursor-pointer text-white`}>{item.countyName}</h1>
            </Link>
        );
    })
    return <>{loopData}</>
}


export default function countyMobile() {
    const titles = data.map((item, index) => {
        return (
            <div key={index} className="border border-1 border-gray-500 rounded-xl p-4 grid grid-cols-2 my-4">
                <h4 className='text-xl p-4'>{item.name}</h4>
                <div>
                    <CountyItem key={index} data={item.data} />
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
