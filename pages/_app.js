import React from "react";
import "./styles/global.css";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      
      <Navbar bgColor="bg-gray-800" />
    
      <Component {...pageProps} />

    </>
  );
}

export default MyApp;
