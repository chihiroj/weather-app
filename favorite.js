import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


/**
 * This file has functions for saving and loading favorites.
 * 
 */
export async function saveFavorites(favoriteCities) {
  try {
    const jsonValue = JSON.stringify(favoriteCities);
    await AsyncStorage.setItem("favoriteCities", jsonValue);
  } catch (error) {
    Alert.alert(
      "Favorites error",
      "Failed to save to favorites."
    );
  }
}


export async function loadFavorites() {
  try {
    const jsonValue = await AsyncStorage.getItem("favoriteCities");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    Alert.alert(
      "Favorites error",
      "Failed to load favorites."
    );
    return [];
  }
}
