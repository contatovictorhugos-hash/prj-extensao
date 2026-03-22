import styled from "styled-components/native";

import { Platform } from 'react-native';

const SO = Platform.OS;

// Aqui são feitas todas as estlizações feitas para a tela de Login
export const LoginContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Body = styled.View`
  width: 80%;
  height: ${SO === 'android' ? '100%' : '80%'};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HeaderContainer = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

export const ButtonLogin = styled.TouchableOpacity`
  padding: 16px;
  border-color: black;
  border-radius: 16px;
  border-width: 1px;
`

export const ButtonLoginText = styled.Text`
  font-size: 16px;
`


export const CommingSoonText = styled.Text`
  font-size: 42px;
  font-weight: bold;
`