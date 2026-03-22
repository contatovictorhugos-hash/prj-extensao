import styled from "styled-components/native";

import { Platform } from 'react-native';

const SO = Platform.OS;

// Aqui são feitas todas as estlizações feitas para a tela de Home
export const HomeContainer = styled.View`
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
  justify-content: space-between;
`

export const InfoContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const SliderBody = styled.View`
  display: flex;
  align-items: center;
  padding: 4px;
`

export const SliderText = styled.Text`
  font-size: 16px;
  color: gray;
`

export const LogoImage = styled.Image`
  width: 55%;
  height: 65%;
`

export const Title = styled.Text`
  font-size: 42px;
  font-weight: bold;
`

export const SrcContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`

export const ButtonsContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`

export const GuestButton = styled.TouchableOpacity`
  background-color: transparent;
`

export const GuestButtonText = styled.Text`
  color: gray;
`