import { View, StyleSheet } from "react-native";
import { List, IconButton, Text } from "react-native-paper";

export default function FavoriteScreen({ favorites, setFavorites, saveFavorites }) {
  const removeFavorite = async (city) => {
    const updated = favorites.filter((c) => c !== city);
    setFavorites(updated);
    await saveFavorites(updated);
  };

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
            description="クリックで天気を表示"
            left={(props) => <List.Icon {...props} icon="city" />}
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                iconColor="red"
                onPress={() => removeFavorite(city)}
              />
            )}
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
