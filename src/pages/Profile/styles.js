import styled from "styled-components/native";

export const ProfileContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
`

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 48px 24px 32px 24px;
  background-color: #111827;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`

export const AvatarImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 4px;
  border-color: white;
  margin-bottom: 16px;
`

export const ProfileName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`

export const ProfileEmail = styled.Text`
  font-size: 14px;
  color: #9ca3af;
  margin-top: 4px;
`

export const InfoCard = styled.View`
  background-color: white;
  margin: 32px 24px 16px 24px;
  padding: 24px;
  border-radius: 16px;
  elevation: 2;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
`

export const InfoRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
  padding-bottom: 12px;
`

export const InfoTextContainer = styled.View`
  margin-left: 16px;
`

export const InfoLabel = styled.Text`
  font-size: 12px;
  color: #6b7280;
`

export const InfoValue = styled.Text`
  font-size: 16px;
  color: #1f2937;
  font-weight: 500;
`

export const LogoutButtonContainer = styled.View`
  padding: 0 24px 32px 24px;
`
