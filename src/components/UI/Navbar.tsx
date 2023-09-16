import React from "react";
import { Search } from "../Search";
import { Assistant } from "../Assistant";
import { Category } from "../Category";
import Profile from "../profile/Profile";
import { Link } from "react-router-dom";
import BasketButton from "./BasketButton";
import "./styles/header.css";
import "../../pages/style_basket.css";
const Navbar: React.FC = () => {
  return (
    <div className="header">
        <div className="navbar" > <Link to={"/"}>Аптека LIL Мороз</Link> </div>
        <div style={{display: "block"}}>
            <div> <Profile/></div>
            <div> <BasketButton /></div>
            <div ><Category /></div>
            <div> <Search /></div>
        </div>
        <Assistant />
    </div>
  );
};

export { Navbar };
