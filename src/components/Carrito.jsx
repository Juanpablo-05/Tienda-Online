// src/components/Carrito.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Carrito() {
  const { cart, addToCart, removeFromCart, totalCart } = useContext(CartContext);

  return (
    <div className="carrito">
      {cart.length === 0 ? (
        <p className="show-message-cart">Tu carrito está vacío 😢</p>
      ) : (
        <>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <img src={product.image} alt={product.title} width="50" />
                <div className="info-cart">
                  <p>{product.price}$</p>
                  <p>Cantidad: {product.quantity}</p>
                  <div className="opc">
                    <button onClick={() => addToCart(product)}>+</button>
                    <button onClick={() => removeFromCart(product.id)}>-</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="total">
            <h3>Total a pagar: {totalCart().toFixed(2)} $</h3>
          </div>
        
        </>
        
      )}
    </div>
  );
}

export default Carrito;
