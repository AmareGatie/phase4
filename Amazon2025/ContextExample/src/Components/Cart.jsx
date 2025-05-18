import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, addItem, removeItem } = useCart();
  return (
    <div>
      <h2>Shopping Cart</h2>
      <button onClick={() => addItem({ id: 1, name: "Laptop" })}>
        Add Laptop
      </button>
      <button onClick={() => addItem({ id: 2, name: "Phone" })}>
        Add Phone
      </button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} <button onClick={() => removeItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
