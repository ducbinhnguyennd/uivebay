import React from "react";
import Navbar from "./Header/MenuHeader/Navbar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import Contact from "./Header/Contact/Contact";
import "../DeafaultLayout/DefaultLayout.scss";

function DefaultLayout({ children }) {
  return (
    <div className="container-default">
      <Contact />
      <div className="header-navbar">
        <Header />
        <Navbar />
      </div>
      <div className="content">{children}</div>
      <Footer />
     
    </div>
  );
}

export default DefaultLayout;
