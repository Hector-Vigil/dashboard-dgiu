import React from "react";
import "./navbar-logo.styles.scss";

const NavBarLogo = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/assets/images/logo_uni.png"}
      alt="Logo de la Universidad"
    />
  );
};

export default NavBarLogo;
