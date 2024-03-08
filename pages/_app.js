import React from "react";
import "./styles/global.css";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react"


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      <Analytics />
      
      <Navbar bgColor="bg-gray-800" />
    
      <Component {...pageProps} />

    </>
  );
}

export default MyApp;
