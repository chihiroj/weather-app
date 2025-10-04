import { View, Button, Modal, Text, TextInput, StyleSheet } from "react-native";

export default function CityDialog({ dialogVisible, setDialogVisible, dialogText, setDialogText, setWeather }) {

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
            <View style={styles.buttons}>
              <Button title="Cancel" onPress={() => setDialogVisible(false)} />
              <Button title="OK" onPress={() => setDialogVisible(false)} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});