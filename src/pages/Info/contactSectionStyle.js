import styled from 'styled-components/native'

export const ContactSectionContainer = styled.ScrollView`
  height: 100%;
`

export const ContactSectionTitle = styled.Text`
  font-weight: 700;
  font-size: 28px;
`

export const MapImage = styled.Image`
  width: 100%;
  border-radius: 20px;
  height: 200px;
  margin-top: 8px;
  margin-bottom: 20px;
`

export const AddressText = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`

export const GoForButton = styled.TouchableOpacity`
  background-color: #1891E2;
  padding: 10px 20px;
  border-radius: 5px;
  align-items: center;
`

export const GoForButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;


export const ContactsContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 100px;
`

export const ContactItem = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  border: 1px solid gray;
  border-right-width: 0;
  border-left-width: 0;
  border-bottom-width: 0;
  align-items: center;
  padding: 12px;
`

export const ContactValueText = styled.Text`
  font-size: 20px;
`