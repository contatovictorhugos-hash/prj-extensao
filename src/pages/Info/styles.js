import styled from "styled-components/native";

// Aqui são feitas todas as estlizações feitas para a tela de Home
export const HomeContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
`

export const ScreenHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items:  center;
  padding-left: 8px;
  padding-right: 8px;
  width: 100%;
  height: 8%;
  justify-content: space-between;
  shadow-color: #000;
  shadow-offset: 0px 4px; 
  shadow-opacity: 0.2; 
  shadow-radius: 4px;
  elevation: 3; 
`;


export const HeaderTitle = styled.Text`
  font-size: 20px;
`

export const LogoImage = styled.Image`
  height: 100%;
  width: 40px;
`


export const MenuContainer = styled.View`
`

export const MenuSrc = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const MenuItem = styled.TouchableOpacity`
  border: 1px solid blue;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: ${({ isSelected }) => isSelected ? '2px' : '0px'};
`

export const MenuItemLabel = styled.Text`
  font-size: 18px;
`

export const MenuContent = styled.View`
  padding: 20px;
`

