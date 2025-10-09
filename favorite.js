import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveFavorites(favoriteCities) {
  try {
    const jsonValue = JSON.stringify(favoriteCities);
    await AsyncStorage.setItem("favoriteCities", jsonValue);
  } catch (error) {
    console.error("Failed to save:", error);
  }
}


export async function loadFavorites() {
  try {
    const jsonValue = await AsyncStorage.getItem("favoriteCities");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Failed to load:", error);
    return [];
  }
}
