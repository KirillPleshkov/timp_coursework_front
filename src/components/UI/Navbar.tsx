import React from "react";
import { Search } from "../Search";
import { Assistant } from "../Assistant";
import { Category } from "../Category";
import Profile from "../profile/Profile";
import { Link } from "react-router-dom";
import BasketButton from "./BasketButton";

const Navbar: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <Link to={"/"}>Название сайта</Link>
      <Category />
      <Search />
      <BasketButton />
      <Profile />
      <Assistant />
    </div>
  );
};

export { Navbar };
