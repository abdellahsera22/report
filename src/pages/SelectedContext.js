import React, { createContext, useState } from "react";

const SelectedContext = createContext();

export const SelectedProvider = ({ children }) => {
  const [selected, setSelected] = useState(null);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export default SelectedContext;
