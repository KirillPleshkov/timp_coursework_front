import React from 'react';
import { Search } from '../Search';

const Navbar: React.FC = () => {
  return (
    <div style={{display: 'flex'}}>
      <div>Название сайта</div>
      <Search/>
      <div>Корзина</div>
      <div>Профиль</div>
    </div>
  );
};

export { Navbar };