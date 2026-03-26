import styled from "styled-components/native";

export const RocketContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
`

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 32px 24px;
  background-color: #059669;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  display: flex;
  align-items: center;
`

export const PageTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-top: 16px;
`

export const SubTitle = styled.Text`
  font-size: 16px;
  color: #d1fae5;
  margin-top: 8px;
  text-align: center;
`

export const PixCard = styled.View`
  background-color: white;
  margin: 32px 24px 16px 24px;
  padding: 24px;
  border-radius: 16px;
  elevation: 3;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  border-top-width: 4px;
  border-top-color: #10b981;
`

export const PixLabel = styled.Text`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
`

export const PixKey = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 24px;
  letter-spacing: 1px;
`

export const VerseContainer = styled.View`
  margin: 16px 24px 32px 24px;
  padding: 16px;
  background-color: #ecfdf5;
  border-radius: 12px;
`

export const VerseText = styled.Text`
  font-size: 14px;
  color: #065f46;
  font-style: italic;
  text-align: center;
  line-height: 22px;
`
