import { useState } from "react";
import { View, Button, Modal, Text, TextInput, StyleSheet } from "react-native";
import { getWeather } from "../weatherApi";


export default function CityDialog({ dialogVisible, setDialogVisible, setWeather }) {
  const [dialogText, setDialogText] = useState("");
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setError(null);
    try {
      const data = await getWeather(city);
      console.log(data);
      setWeather(data);
      setDialogVisible(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!dialogVisible) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Modal
        visible={dialogVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDialogVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.title}>Enter your city</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={dialogText}
              onChangeText={setDialogText}
            />
            <Text style={styles.error}>{error}</Text>
            <View style={styles.buttons}>
              <Button title="Cancel" onPress={() => setDialogVisible(false)} />
              <Button title="OK" onPress={() => fetchWeather(dialogText)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: 280,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});