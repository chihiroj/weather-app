import { useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { View } from "react-native";
import CityDialog from "./CityDialog";
import { getWeather } from "../weatherApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function HomeScreen({ favorites, setFavorites }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);




  useEffect(() => {
    getWeather("Tokyo").then(setWeather).catch(console.error);
  }, []);
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
      ? favorites.filter((c) => c !== city)   // 登録済み → 削除
      : [...favorites, city];                 // 未登録 → 追加

    setFavorites(updated);
    await saveFavorites(updated);
    setIsFavorite(!already)
  }

  return (
    <View style={styles.container}>
      <CityDialog dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} setWeather={setWeather} />
      <View style={styles.currentWeatherContainer}>
        <View style={styles.cityContainer}>
          <Text style={textStyles.heading}>{weather?.location.name ?? "Search city"}</Text>
          <IconButton
            icon="square-edit-outline"
            size={30}
            iconColor="black"
            onPress={() => setDialogVisible(true)}
          />
        </View>
        <Text style={textStyles.secondHeading}>{weather?.current.temp_c}℃</Text>
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
          <Card.Title title={forecast.date} />
          <Card.Content><Text>{forecast.day.condition.text}/ {forecast.day.avgtemp_c}℃</Text></Card.Content>
        </Card>
      ))}

      <Button
        style={styles.likeButton}
        mode="contained"
        onPress={registerFavorite}
        // ★ ハートの描画を関数にして色だけ変える
        icon={() => (
          <MaterialCommunityIcons
            name="heart"
            size={20}
            color={isFavorite ? "#ff5c8d" : "#999"} // ← 中のハートだけ色変更！
          />
        )}
      >
        Register favorite
      </Button>

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
  },
  likeButton: {
    marginTop: 20
  }
});