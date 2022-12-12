import React from 'react'
import Stores from './stores/Stores'
import { Route, Routes} from "react-router-dom";
import  Menu  from './menu/Menu';
import Cart from './menu/Cart';

function RouterConfig() {
  return (
    <Routes>
        <Route path="/" element={<Stores />} />
        <Route path="/store/:id" element={<Menu />} />
        <Route path="/menu" element={<Cart />} />
    </Routes>
  )
}

export default RouterConfig