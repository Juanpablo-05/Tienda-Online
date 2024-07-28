// src/components/Nav.jsx
import React, { useContext, useState } from "react";
import { CartContext } from '../context/CartContext';

function Nav({ filter }) {
  const [preciomin, setPreciomin] = useState(0);
  const [preciomax, setPreciomax] = useState(22);
  const { showCart, open } = useContext(CartContext);

  const canMinPrice = (e) => {
    setPreciomin(e.target.value);
    filter((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };

  const canMaxPrice = (e) => {
    setPreciomax(e.target.value);
    filter((prevState) => ({
      ...prevState,
      maxPrice: e.target.value,
    }));
  };

  const cancategory = (e) => {
    filter((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  return (
    <>
      <div className="container__nav">
        <nav>
          <div className="logo">
            <h1>Fake Store</h1>
          </div>
          <ul>
            
            <li>
              <div className={open ? `carrito-btn open` : `carrito-btn`}>
                <button onClick={showCart}>🛒</button>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <section className="filter">
        <div className="precio">
          <label>Precios minimo - (8)$: </label>
          <input onChange={canMinPrice} type="text" className="f_i"/>
        </div>

        <div className="precio">
          <label>Precios maximo - (1000)$: </label>
          <input onChange={canMaxPrice} type="text" className="f_i"/>
        </div>

        <div className="categoria">
          <label>Categorias:</label>
          <select onChange={cancategory}>
            <option value="all">todos</option>
            <option value="men's clothing">Ropa De Hombres</option>
            <option value="women's clothing">Ropa De Mujeres</option>
            <option value="jewelery">Joyerias</option>
            <option value="electronics">Electronicos</option>
          </select>
        </div>
      </section>
    </>
  );
}

export default Nav;
