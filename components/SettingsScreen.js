import { useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { TemperatureContext } from "../temperatureContext";


export default function SettingsScreen() {
  const { isCelsius, setIsCelsius } = useContext(TemperatureContext);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Temperature Unit</Text>
      <View style={styles.row}>
        <Text style={styles.unit}>°C</Text>
        <Switch
          value={!isCelsius}
          onValueChange={() => setIsCelsius(!isCelsius)}
        />
        <Text style={styles.unit}>°F</Text>
      </View>
      <Text style={styles.result}>
        Currentv: {isCelsius ? "Celsius  (°C)" : "Fahrenheit  (°F)"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: { fontSize: 20, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center" },
  unit: { marginHorizontal: 10, fontSize: 18 },
  result: { marginTop: 20, fontSize: 16 },
});
