import { useEffect, useState, useContext } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import { View } from "react-native";
import CityDialog from "./CityDialog";
import { getWeather } from "../weatherApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TemperatureContext } from "../temperatureContext";
import * as Location from "expo-location";
import { FAB, Portal } from 'react-native-paper';
import { saveFavorites } from "../favorite";
import { Alert } from "react-native";

/**
 * This componet is for showing  weather for selected city. 
 * 
 */
export default function HomeScreen({ favorites, setFavorites, selectedCity, setSelectedCity }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isCelsius } = useContext(TemperatureContext);
  const [fabOpen, setFabOpen] = useState(false);

  useEffect(() => {
    console.log(selectedCity);
    getWeather(selectedCity)
      .then(setWeather)
      .catch(() => Alert.alert("Error", "Failed to load weather data"));
  }, [selectedCity]);
  useEffect(() => {
    if (weather?.location?.name) {
      setIsFavorite(favorites.includes(weather.location.name));
    }
  }, [favorites, weather]);


  const registerFavorite = async () => {
    if (!weather?.location?.name) return;

    const city = weather.location.name;
    const already = favorites.includes(city);

    const updated = already
      ? favorites.filter((c) => c !== city)
      : [...favorites, city];

    setFavorites(updated);
    await saveFavorites(updated);
    setIsFavorite(!already)
  };
  const getCityFromGPS = async () => {
    try {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission was not granted."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const data = await getWeather(`${latitude},${longitude}`);
      setWeather(data);
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert(
        "Location Error",
        "Failed to get current location."
      );
    }
  };

  return (
    <View style={styles.container}>
      <CityDialog dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} setWeather={setWeather} setSelectedCity={setSelectedCity} />
      <View style={styles.currentWeatherContainer}>
        <View style={styles.cityContainer}>
          <Text style={textStyles.heading}>{weather?.location.name ?? "Search city"}</Text>
        </View>
        <Text style={textStyles.secondHeading}>{isCelsius
          ? `${weather?.current.temp_c ?? "--"}℃`
          : `${weather?.current.temp_f ?? "--"}℉`}</Text>
        {weather &&
          <Image
            source={{ uri: `https:${weather?.current.condition.icon}` }}
            style={{ width: 64, height: 64 }}
          />
        }
        <Text style={textStyles.thirdHeading}>{weather?.current.condition.text}</Text>
      </View>

      {weather?.forecast.forecastday.map(forecast => (
        <Card key={forecast.date} style={styles.card}>
          <Card.Title title={forecast.date} titlestyle={styles.cardTitle} />
          <Card.Content><Text>
            {forecast.day.condition.text}/{" "}
            {isCelsius
              ? `${forecast.day.avgtemp_c}℃`
              : `${forecast.day.avgtemp_f}℉`}</Text></Card.Content>
        </Card>
      ))}

      <Button
        style={styles.likeButton}
        mode="contained"
        onPress={registerFavorite}

        icon={() => (
          <MaterialCommunityIcons
            name="heart"
            size={20}
            color={isFavorite ? "#ff5c8d" : "#999"}
          />
        )}
      >
        Register favorite
      </Button>

      <Portal>
        <FAB.Group
          backdropColor="transparent"
          dismissOnBackdropPress={false}
          open={fabOpen}
          visible
          icon={fabOpen ? 'window-close' : 'menu'}
          actions={[
            { icon: 'crosshairs-gps', onPress: getCityFromGPS },
            { icon: 'square-edit-outline', onPress: () => setDialogVisible(true) },
          ]}
          style={{
            position: 'absolute',
            right: 16,
            bottom: 80,
          }}
          onStateChange={() => setFabOpen(!fabOpen)}
          onPress={() => {
            if (fabOpen) {
              setFabOpen(!fabOpen);

            }
          }}
        />
      </Portal>
    </View >
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
  },
  card: {
    marginTop: 10,
    width: "90%",
    borderWidth: 1,
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
  },
  likeButton: {
    marginTop: 20
  }
});