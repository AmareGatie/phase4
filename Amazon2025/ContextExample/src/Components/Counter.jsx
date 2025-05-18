import React from "react";
import { useCounter } from "../context/CounterContext";

const Counter = () => {
  const { state, dispatch } = useCounter();
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
};

export default Counter;
