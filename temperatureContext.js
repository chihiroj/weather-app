import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This file is for saving celsius and fahrenheit setting.
 */
export const TemperatureContext = createContext({
  isCelsius: true,
  setIsCelsius: () => { },
});

export function TemperatureProvider({ children }) {
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const savedValue = await AsyncStorage.getItem("temperature_unit");
        if (savedValue !== null) {
          setIsCelsius(savedValue === "celsius");
        }
      } catch (e) {
        console.error("Failed to load unit setting:", e);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(
          "temperature_unit",
          isCelsius ? "celsius" : "fahrenheit"
        );
      } catch (e) {
        console.error("Failed to save unit setting:", e);
      }
    })();
  }, [isCelsius]);

  return (
    <TemperatureContext.Provider value={{ isCelsius, setIsCelsius }}>
      {children}
    </TemperatureContext.Provider>
  );
}
