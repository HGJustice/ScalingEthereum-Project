import React from "react";
import CustomConnectButton from "./CustomConnectButton";
import "../Styles/NavBar.css";
export default function Header() {
  return (
    <header className="header">
      <nav className="navBar">
        <h1 className="navBar__header">Web3Car</h1>
        <ul className="navBar__navigationLinks"></ul>
        <CustomConnectButton />
      </nav>
    </header>
  );
}
