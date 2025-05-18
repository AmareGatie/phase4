import React from "react";
import Header from "../Header/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      {/* children is a special prop that allows you to pass and
      render nested components inside a parent component. */}
    </>
  );
}

export default Layout;
