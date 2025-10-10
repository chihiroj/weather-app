import { View, StyleSheet } from "react-native";
import { List, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


export default function FavoriteScreen({ favorites, setFavorites, saveFavorites, setSelectedCity }) {
  const navigation = useNavigation();

  const removeFavorite = async (city) => {
    const updated = favorites.filter((c) => c !== city);
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const handleCityPress = (city) => {
    setSelectedCity(city);
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite city</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Add your favorite city</Text>
      ) : (
        favorites.map((city) => (
          <List.Item
            key={city}
            title={city}
            description="Tap to view weather"
            left={(props) => <List.Icon {...props} icon="city" />}
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                iconColor="red"
                onPress={() => removeFavorite(city)}
              />
            )}
            onPress={() => handleCityPress(city)}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  emptyText: { textAlign: "center", color: "#888", marginTop: 30 },
});
