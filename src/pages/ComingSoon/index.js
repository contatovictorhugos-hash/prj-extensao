
// Importando o componente de delimitação de tela
import { SafeAreaViewComponent } from "../../styles";

// Importando os componentes estilizados
import { 
  Body, 
  LoginContainer,
  CommingSoonText,
  HeaderContainer,
  ButtonLogin,
  ButtonLoginText
} from "./styles";

// aqui é definido o componente de Login e pegando a propriedade navigation presente para poder fazer a navegação entre telas
export default function CommingSoon({ navigation }){

  return (
    <SafeAreaViewComponent>
      <LoginContainer>
        <HeaderContainer>
          <ButtonLogin onPress={() => navigation.navigate('Login')}>
            <ButtonLoginText>Login</ButtonLoginText>
          </ButtonLogin>
        </HeaderContainer>
        <Body>
          <CommingSoonText>Em breve mais...</CommingSoonText>
        </Body>
      </LoginContainer>
    </SafeAreaViewComponent>
  )
}