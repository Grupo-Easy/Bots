import React, { useEffect, useState, useMemo } from "react";
import Login from "./Login/";
import Dashboard from "./Dashboard/";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import base64 from "react-native-base64";
import api from "./services/api";
import { AuthContext } from "./components/context";
import { DrawerContent } from "./components/drawerContet";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Routes() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authContext = useMemo(() => ({
    signIn: async () => {
      setIsLoading(true);
      async function Token() {
        const Username = await AsyncStorage.getItem("Username");
        const Password = await AsyncStorage.getItem("Password");
        const toHash = `${Username}:${Password}`;
        const hash = base64.encode(toHash);
        const Basic = `Basic ${hash}`;
        api
          .get("/login", {
            headers: {
              Authorization: Basic,
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          })
          .then(async (response) => {
            async function GetDatas() {
              const Token = await AsyncStorage.getItem("Token");
              console.log(Token);
              await api
                .get("/auto", {
                  headers: {
                    Authorization: `Bearer ${response.data.token}`,
                  },
                })
                .then(async (response) => {
                  console.log(response.data);
                  const { name } = response.data;
                  console.log(name);
                  await AsyncStorage.setItem("InitialLetter", name[0]);
                  await AsyncStorage.setItem("Name", name);

                  AsyncStorage.setItem("Token", response.data.token);
                  await setToken(response.data.token);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            await GetDatas();
            await setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      await Token();
    },
    signOut: async () => {
      setToken(null);
      await AsyncStorage.removeItem("Password");
      await AsyncStorage.removeItem("Token");
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {token !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="Dashboard" component={Dashboard} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
