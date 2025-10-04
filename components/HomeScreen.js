import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { View } from "react-native-web";
import CityDialog from "./CityDialog";

export default function HomeScreen() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [weather, setWeather] = useState(null);

  return (
    <View style={styles.container}>
      <CityDialog dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} dialogText={dialogText} setDialogText={setDialogText} setWeather={setWeather} />
      <View style={styles.currentWeatherContainer}>
        <View style={styles.cityContainer}>
          <Text style={textStyles.heading}>Tokyo</Text>
          <IconButton
            icon="square-edit-outline"
            size={30}
            iconColor="black"   // react-native-paper v5 以降は `color` ではなく `iconColor`
            onPress={() => setDialogVisible(true)}
          />
        </View>
        <Text style={textStyles.secondHeading}>21℃</Text>
        <MaterialCommunityIcons name="weather-sunny" size={64} color="orange" />
        <Text style={textStyles.thirdHeading}>Sunny</Text>
      </View>

      <Card style={styles.card}>
        <Card.Title title="今日の天気" />
        <Card.Content><Text>晴れ / 25℃</Text></Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="今日の天気" />
        <Card.Content><Text>晴れ / 25℃</Text></Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="今日の天気" />
        <Card.Content><Text>晴れ / 25℃</Text></Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="今日の天気" />
        <Card.Content><Text>晴れ / 25℃</Text></Card.Content>
      </Card>
    </View>
  );
}

const textStyles = StyleSheet.create({
  heading: {
    fontSize: 60
  },
  secondHeading: {
    fontSize: 30
  },
  thirdHeading: {
    fontSize: 22
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  },
  card: {
    marginTop: 10,
    width: "90%",
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    elevation: 0,
    shadowOpacity: 0,
    marginVertical: 8,

  },
  currentWeatherContainer: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  cityContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    gap: 10
  }
});