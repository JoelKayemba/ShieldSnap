import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import des icônes Expo
import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import ViewScreen from "../screens/ViewScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === "Accueil") {
                            iconName = "home-outline";
                        } else if (route.name === "Uploader") {
                            iconName = "cloud-upload-outline";
                        } else if (route.name === "Voir Image") {
                            iconName = "eye-outline";
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#007AFF",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: { backgroundColor: "#f8f8f8", paddingBottom: 5 },
                })}
            >
                <Tab.Screen name="Accueil" component={HomeScreen} />
                <Tab.Screen name="Uploader" component={UploadScreen} />
                <Tab.Screen name="Voir Image" component={ViewScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
