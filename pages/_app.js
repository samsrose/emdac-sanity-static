import React from "react";
import "./styles/global.css";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      
      <Navbar bgColor="bg-gray-800" />
    
      <Component {...pageProps} />

      <Footer/>
    </>
  );
}

export default MyApp;
