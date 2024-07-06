import React, { createContext, useContext, useState, useEffect } from "react";

const UnitContext = createContext();

export const useUnit = () => useContext(UnitContext);

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState("Celsius");

  useEffect(() => {
    const savedUnit = localStorage.getItem("unit");
    if (savedUnit) {
      setUnit(savedUnit);
    }
  }, []);

  const toggleUnit = () => {
    setUnit((prevUnit) => {
      const newUnit = prevUnit === "Celsius" ? "Fahrenheit" : "Celsius";
      localStorage.setItem("unit", newUnit);
      return newUnit;
    });
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};
