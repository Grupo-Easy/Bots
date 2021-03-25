import styled from "styled-components";
import { SafeAreaView, View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Wrapper = styled(SafeAreaView)`
  flex: 1;
  background: #2e86ab;
  color: #fff;
`;
export const Header = styled(View)`
  padding: ${RFPercentage(3)}px;
`;
export const Title = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: ${RFPercentage(4)}px;
`;
export const Main = styled(View)`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
`;
export const Cards = styled(View)`
  background: #fff;
  width: ${RFPercentage(47.73)}px;
  height: ${RFPercentage(15.76)}px;
  border-radius: 16px;
  padding: ${RFPercentage(2)}px;
  margin: ${RFPercentage(2)}px;
`;
export const CardTitle = styled(Text)`
  color: #333;
  margin-bottom: ${RFPercentage(5)}px;
  font-size: ${RFPercentage(3)}px;
`;

export const CardDescription = styled(Text)`
  color: #333;
  font-size: ${RFPercentage(3)}px;
`;
