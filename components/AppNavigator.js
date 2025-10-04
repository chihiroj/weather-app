import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteScreen from "./FavoriteScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={FavoriteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}