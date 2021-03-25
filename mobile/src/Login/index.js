import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Title,
  Input,
  Container,
  ButtomView,
  ButtomProperty,
} from "./style";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../components/context";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { signIn } = React.useContext(AuthContext);
  async function Submit() {
    await AsyncStorage.setItem("Username", Username);
    await AsyncStorage.setItem("Password", Password);
    signIn();
  }
  useEffect(() => {
    setTimeout(async () => {
      const Username = await AsyncStorage.getItem("Username");
      if (Username != undefined || Username != null) {
        setUsername(Username);
      }
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
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
              <Title>Login</Title>
              <Input
                placeholder="Nome de usuário"
                value={Username}
                onChangeText={setUsername}
                style={{
                  shadowColor: "#fff",
                  shadowOpacity: 0.1,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                }}
              />

              <Input
                placeholder="Senha"
                onChangeText={setPassword}
                value={Password}
                secureTextEntry={true}
                style={{
                  shadowColor: "#fff",
                  shadowOpacity: 0.1,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                }}
              />

              <ButtomView
                style={{
                  shadowColor: "#fff",
                  shadowOpacity: 0.01,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                }}
              >
                <ButtomProperty
                  title="Log in"
                  color="#fff"
                  onPress={() => {
                    Submit();
                  }}
                />
              </ButtomView>
            </Container>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Wrapper>
    </>
  );
}
