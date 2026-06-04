import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon.ico" rel="emdac favicon" />
        </Head>
        <body className="bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
