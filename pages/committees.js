import React from 'react'

const data = {
    "Officers": [
      {name: "Kathy Staats, MD", role: "President" },
      {name: "Dustin Ballard, MD", role: "President Elect"},
      {name: "Zita Konick, MD", role: "Secretary"},
      {name: "Daniel Shepherd, MD", role: "Treasurer"},
      {name: "Nichole Bosson, MD", role: "Immediate Past President"},
      {name: "John Rose, MD", role: "At-large Associate Member"},
      {name: "Marc Gautreau, MD", role: "At-Large Associate Member"}
    ],
    "Scope of Practice": [
        "Ken Miller", "Kevin Mackey", "Kimberly Freeman", "Atilla Uner", "Nichole Bosson", "Eric Rudnick", "Marc Gautreau"
    ],
    "Legislative": [
        "Katherine Shafer", "Kathy Staats", "Daniel Shepherd", "Senai Kidane", "Marianne Gausche-Hill", "Zita Konick", "Carl Shulz"
    ],
    "Medical Advisory": [
        "Marianne Gausche-Hill", "John Brown", "Ken Miller", "Eric Rudnick"
    ],
    "Nominating": [
        "Greg Gilbert", "Karl Sporer", "Tom Ronay", "Bruce Haynes"
    ]
}

export default function committees() {
    return (
      <>
        <div className="w-full px-8 text-center">
          <div className="flex flex-wrap bg-gray-900 lg:w-full sm:mx-auto pt-12 px-2">
            <div className="my-8 max-w-xl pr-4 text-center mx-auto">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-100 font-heading mb-2">EMDAC Committees</h2>
            </div>
          </div>
        </div>
        <div className='py-4 w-full container mx-auto mb-12'>
          <h2 className='text-white text-3xl font-bold py-4 text-center'>Officers</h2>
          <div className='grid grid-cols-2'>
            {data['Officers'].map((item, index) => {
              // console.log(item)
              return <OfficersMappedItems item={item} key={index} />
            })}
          </div>
          <h2 className='text-white text-3xl font-bold py-8 text-center'>Scope of Practice Committee</h2>
          <div className='grid grid-cols-2'>
            {data['Scope of Practice'].map((item, index) => {
              return <DataMappedItems item={item} key={index} />
            })}
          </div>
          <h2 className='text-white text-3xl font-bold py-8 text-center'>Legislative Committee</h2>
          <div className='grid grid-cols-2'>
            {data['Legislative'].map((item, index) => {
              return <DataMappedItems item={item} key={index} />
            })}
          </div>
          <h2 className='text-white text-3xl font-bold py-8 text-center'>Medical Advisory Committee</h2>
          <div className='grid grid-cols-2'>
            {data['Medical Advisory'].map((item, index) => {
              return <DataMappedItems item={item} key={index} />
            })}
          </div>
          <h2 className='text-white text-3xl font-bold py-8 text-center'>Nominating Committee</h2>
          <div className='grid grid-cols-2'>
            {data['Nominating'].map((item, index) => {
              return <DataMappedItems item={item} key={index} />
            })}
          </div>
        </div>
    </>
      )
  }
  
  
  function DataMappedItems({ item }) {
    return (
      <div className="py-4 px-2 sm:py-3 w-full " >
        <div className="p-4 shadow-md sm:flex-row border border-1 border-gray-600 rounded-sm rounded-md grid bg-gray-800" >
          <div className="flex-grow">
            <div className="flex flex-col align-center justify-center" >
              <h1 className="text-gray-200 md:text-xl sm:text-4xl title-font text-center font-normal">
                {item}
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
  function OfficersMappedItems({ item }) {
    return (
      <div className="py-4 px-2 sm:py-3 w-full " >
        <div className="p-4 shadow-md sm:flex-row border border-1 border-gray-600 rounded-sm rounded-md grid bg-gray-800" >
          <div className="flex-grow">
            <div className="flex flex-col align-center justify-center" >
              <h1 className="text-gray-200 md:text-xl sm:text-4xl title-font text-center font-normal">
                {item.name}
              </h1>
              <p className='text-gray-200 my-2 md:text-sm title-font text-center font-normal'>
                {item.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }