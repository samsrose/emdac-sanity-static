import Script from 'next/script'
import CountyMobile from "../components/map/CountyMobile";
import Counties from "../components/map/Counties";
import response from "../components/map/response";
import SideItems from '../components/map/SideItems';



const Lemsas = () => {
  return (
    <>
      <Script src="/lib/mapdata.js" strategy="lazyOnload" onLoad={() => {
          console.log('Metadata initialized.')
        }} />
      <Script src="/lib/statemap.js" strategy="lazyOnload" onLoad={() => {
          console.log('Map initialized.')
        }} />
      <div className="flex flex-wrap bg-gray-900 sm:mx-auto pt-12 pb-12 px-2">
        <div className="my-8 max-w-xl pr-4 text-center mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 font-heading">California LEMSAs</h2>
          <span className="text-red-500 text-xl font-normal">Hover over for more information</span>
        </div>
      </div>
      <section className="text-gray-100 body-font w-full relative container-fluid px-4 mx-auto h-screen bg-gray-900 flex lg:hidden">
        <ul className="w-full">
            {/* <CountyMobile data={response}/> */}
            <Counties counties={response} />
        </ul>
      </section>
      
      <div className='flex flex-row bg-gray-900 lg:flex hidden'>
      <div className="flex flex-wrap ml-24 w-2/3" id="map"></div>
      <div className="flex flex-wrap w-1/3">
      <ul className="ml-4 mt-4 ">
          <li className="py-1 flex flex-row border-gray-400">
          <div className="w-4 h-4 bg-blue-400  rounded m-2"></div>
          <h4 className=" ml-2 text-lg text-white">Central California EMS</h4>
          </li>
          <li className="py-1 flex flex-row">
          <div className="w-4 h-4 bg-green-600  rounded m-2"></div>
          <h4 className=" ml-2 text-lg text-white">Inland Counties EMS</h4>
          </li>
          <li className="py-1 flex flex-row border-gray-400">
          <div className="w-4 h-4 bg-pink-400  rounded m-2"></div>
          <h4 className=" ml-2 text-lg text-white">Mountain Valley EMS</h4>
          </li>
          <li className="py-1 flex flex-row border-gray-400">
          <div className="w-4 h-4 bg-red-500  rounded m-2"></div>
          <h4 className=" ml-2 text-lg text-white">North Coast EMS</h4>
          </li>
          <li className="py-1 flex flex-row border-gray-400">
          <div className="w-4 h-4 bg-yellow-500  rounded m-2"></div>
          <h4 className=" ml-2 text-lg text-white">Northern California EMS</h4>
          </li>
          <li className="py-1 flex flex-row border-gray-400">
          <div className="w-4 h-4 bg-purple-500  rounded m-2"></div>
          <h4 className=" ml-2 text-lg text-white">Sierra-Sacramento EMS</h4>
          </li>
          <li className="pt-1 pb-2 flex flex-row border-gray-400">
          <div className="w-4 h-4 bg-indigo-500  rounded m-2"></div>
          <h4 className=" ml-2 text-lg text-white">County-based EMS Agencies</h4>
          </li>

        </ul>
      </div>
      </div>
    </>
  )
}

export default Lemsas

