import styled from "styled-components/native";

export const SignInContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HeaderContainer = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
`

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`

export const CancelButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-color: black;
  border-radius: 16px;
  border-width: 1px;
`

export const FormContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  gap: 16px;
`

export const FormItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
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
  padding: 12px;
  font-size: 16px;
  width: 85%;
`

export const SrcContainer = styled.View`
  display: flex;
  align-items: flex-end;
  width: 80%;
  margin-top: 32px;
`
