import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import {
  CardDescription,
  Cards,
  CardTitle,
  Header,
  Main,
  Title,
  Wrapper,
} from "./style";
import { StatusBar } from "expo-status-bar";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
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
    <>
      <StatusBar style="light" />
      <Wrapper>
        <Header>
          <Title>Painel de Usuário</Title>
        </Header>
        <Main>
          <Cards>
            <CardTitle>Total viagens</CardTitle>
            <CardDescription>0</CardDescription>
          </Cards>
          <Cards>
            <CardTitle>Total combustiveis</CardTitle>
            <CardDescription>€ 0,00</CardDescription>
          </Cards>
          <Cards>
            <CardTitle>Total portagens</CardTitle>
            <CardDescription>€ 0,00</CardDescription>
          </Cards>
          <Cards>
            <CardTitle>Rendimento</CardTitle>
            <CardDescription>€ 0,00</CardDescription>
          </Cards>
        </Main>
      </Wrapper>
    </>
  );
}
