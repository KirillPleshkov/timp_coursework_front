import React from "react";
import { Search } from "../Search";
import { Assistant } from "../Assistant";
import { Category } from "../Category";
import Profile from "../profile/Profile";

const Navbar: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>Название сайта</div>
      <Category />
      <Search />
      <div>Корзина</div>
      <Profile />
      <Assistant />
    </div>
  );
};

export { Navbar };
