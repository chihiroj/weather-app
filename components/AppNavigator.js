import { CommonActions, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteScreen from "./FavoriteScreen";
import { BottomNavigation } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SettingsScreen from "./SettingsScreen";
import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites } from "../favorite";
import { TemperatureProvider } from "../temperatureContext";






const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [favorites, setFavorites] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    loadFavorites().then(setFavorites);
  }, []);

  return (
    < TemperatureProvider >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            animation: 'shift',
            headerShown: false
          }}
          tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
              navigationState={state}
              safeAreaInsets={insets}
              onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                  preventDefault();
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                  });
                }
              }}
              renderIcon={({ route, focused, color }) =>
                descriptors[route.key].options.tabBarIcon?.({
                  focused,
                  color,
                  size: 24,
                }) || null
              }
              getLabelText={({ route }) => {
                const { options } = descriptors[route.key];
                const label =
                  typeof options.tabBarLabel === 'string'
                    ? options.tabBarLabel
                    : typeof options.title === 'string'
                      ? options.title
                      : route.name;

                return label;
              }}
            />
          )}>
          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          >
            {() => (<HomeScreen favorites={favorites} setFavorites={setFavorites} selectedCity={selectedCity} />)}
          </Tab.Screen>

          <Tab.Screen
            name="Favorite"
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" color={color} size={26} />
              ),
            }}
          >
            {() => (<FavoriteScreen favorites={favorites} setFavorites={setFavorites} saveFavorites={saveFavorites} setSelectedCity={setSelectedCity} />)}
          </Tab.Screen>

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TemperatureProvider >
  )
}