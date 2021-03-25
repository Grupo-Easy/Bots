import React from "react";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import { StatusBar } from "expo-status-bar";
import * as Network from "expo-network";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <Routes />
    </>
  );
}
