import React, { createContext, useContext, useReducer } from "react";

// Create data layer
export const StateContext = createContext();

// Wrap and provide data layer to children
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Pull and push data from/to data layer
export const useStateValue = () => useContext(StateContext);