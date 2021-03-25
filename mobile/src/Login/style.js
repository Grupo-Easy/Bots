import styled from "styled-components";
import { SafeAreaView, Text, TextInput, View, Button } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Wrapper = styled(SafeAreaView)`
  flex: 1;
  background: #2e86ab;
`;
export const Title = styled(Text)`
  color: #fff;
  font-size: ${RFPercentage(7)};
  font-weight: bold;
  margin-bottom: ${RFPercentage(3.5)};
  text-transform: uppercase;
  /* padding: ; */
`;
export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Input = styled(TextInput)`
  padding: ${RFPercentage(1.5)}px;
  margin: ${RFPercentage(3)}px;
  width: ${RFPercentage(50)}px;
  border-radius: 3px;
  background: #fff;
`;
export const ButtomView = styled(View)`
  background: #43c2f7;
  /* border: 1px solid rgba(0, 0, 0, 0.36); */
  /* box-sizing: border-box; */
  border-radius: 3px;
  width: ${RFPercentage(50)}px;
  margin-top: ${RFPercentage(7)}px;
`;
export const ButtomProperty = styled(Button)``;
