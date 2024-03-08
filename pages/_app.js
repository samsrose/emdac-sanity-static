import React from "react";
import "./styles/global.css";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      <Analytics />
      <SpeedInsights/>
      
      <Navbar bgColor="bg-gray-800" />
    
      <Component {...pageProps} />

    </>
  );
}

export default MyApp;
