import * as React from "react";
import Layout from "../components/Layout";
import Helmet from "react-helmet";
import { SEO } from "../components/SEO";
import config from "../utils/config";

export default function Home() {
  return (
    <div>
      <Helmet title={config.siteTitle} />
      {/* <SEO /> */}
      <Layout />
    </div>
  );
}
