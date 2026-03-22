import styled from "styled-components/native";

// Aqui são feitas todas as estlizações feitas para a tela de Register

export const RegisterContainter = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderContainer = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`

export const AvatarInputContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
`

export const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const CancelButton = styled.TouchableOpacity`
  padding: 16px;
  border-color: black;
  border-radius: 16px;
  border-width: 1px;
`


export const FormContainer = styled.View`
  display: flex;
  flex-direction: col;
  justify-content: space-between;
  width: 80%;
  gap: 16px;
`

export const FormItemName = styled.View`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  align-items: start;
`

export const FormInputName = styled.TextInput`
  width: 100%;
  border-color: lightgrey;
  border-width: 1px;
  border-radius: 8px;
  padding: 8px;
  font-size: 16px;
`

export const FormItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
export const FormLabel = styled.Text`
  font-size: 16px;
`

export const FormIcon = styled.View`
  display: flex;
  align-items: center;
  width: 10%;
  justify-content: center;
`

export const FormInput = styled.TextInput`
  border-color: lightgrey;
  border-width: 1px;
  border-radius: 8px;
  padding: 8px;
  font-size: 16px;
  width: 85%;
`

export const FormCityInput = styled.TextInput`
  border-color: lightgrey;
  border-width: 1px;
  border-radius: 8px;
  padding: 8px;
  font-size: 16px;
  width: 40%;
`

export const FormZipCodeInput = styled.TextInput`
  border-color: lightgrey;
  border-width: 1px;
  border-radius: 8px;
  padding: 8px;
  font-size: 16px;
  width: 25%;
`

export const CityStateZipCodeContainer = styled.View`
  width: 85%;
  display: flex;
  flex-direction: row;
  gap: 8px;
`



export const SrcContainer = styled.View`
  display: flex;
  align-items: flex-end;
  width: 80%;
  margin-top: 24px;
`
