import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Qwer from './pages/Qwer';

function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/qwer" element={<Qwer/>} />
       </Routes>
     </BrowserRouter>
  );
}

export default App;
