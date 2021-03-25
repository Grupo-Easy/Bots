import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Title, Text, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AuthContext } from "../components/context";
import AsyncStorage from "@react-native-community/async-storage";
import { StatusBar } from "expo-status-bar";

export function DrawerContent(props) {
  const { signOut } = useContext(AuthContext);
  const [InitialLetter, setInitialLetter] = useState(null);
  const [Name, setName] = useState(null);
  async function Submit() {
    signOut();
  }

  useEffect(() => {
    async function SetDatas() {
      setInitialLetter(await AsyncStorage.getItem("InitialLetter"));
      setName(await AsyncStorage.getItem("Name"));
    }
    SetDatas();
  });

  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.container}>
            <View style={styles.initialLetter}>
              <Text style={styles.Letter}>{InitialLetter}</Text>
            </View>
            <Text style={styles.fullName}>Olá, {Name}</Text>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sair"
            onPress={() => {
              Submit();
            }}
          ></DrawerItem>
        </Drawer.Section>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(5),
  },
  initialLetter: {
    backgroundColor: "#2e86ab",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFPercentage(50),
  },
  Letter: {
    color: "#fff",
    fontSize: RFPercentage(5),
  },
  fullName: {
    marginTop: RFPercentage(2),
    fontSize: RFPercentage(3),
  },
});
