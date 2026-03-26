
// Importando o componente de delimitação de tela
import { SafeAreaViewComponent } from "../../styles";

// Importando os componentes estilizados
import { 
  Body, 
  HomeContainer, 
  SrcContainer, 
  ButtonsContainer, 
  GuestButtonText, 
  GuestButton, 
  InfoContainer, 
  LogoImage,
  Title,
  SliderBody,
  SliderText
} from "./styles";

// Importando o componente de botão padrão para a aplicação
import { Button } from "../../components/Button";

// Importando a logo da metodista
import LogoImageSrc from '../../../assets/MetodistaLogo.png'

// Importando o componente de swiper para mostrar os textos
import Swiper from 'react-native-swiper';

// Importando o componente de estilização do próprio react native
import { StyleSheet } from 'react-native'


// aqui é definido o componente de Home e pegando a propriedade navigation presente para poder fazer a navegação entre telas
export default function Home({ navigation }){

  // definidos os textos que vão ser mostrados no swiper
  const sliderTexts = [
    "Venha fazer parte dessa comunidade!",
    "Descubra mais sobre a Igreja",
    "Metodista em Santana de Parnaíba"
  ]

  return (
    <SafeAreaViewComponent>
      <HomeContainer>
        <Body>
            <InfoContainer>
              {/* Aqui é passado o import da logo para dentro do componente de imagem */}
              <LogoImage source={LogoImageSrc}/>
              <Title>Bem vindo Metodista!</Title>
            
              <Swiper style={styles.swiper}>
                {/* Mapeando os itens do array sliderTexts, funciona basicamente como um forEach, mas possui um retorno de um array. No react pode ser feito isso para diminuir repetição de código */}
               {sliderTexts.map((item, index) => (
                 <SliderBody key={index}>
                   <SliderText>{item}</SliderText>
                 </SliderBody>
               ))}
             </Swiper>

           </InfoContainer> 
           <SrcContainer>
            <ButtonsContainer>
              <Button label={'Entrar'} type='secondary' onPress={() => navigation.navigate('SignIn')}/>
              <Button 
                label={'Cadastre-se'} 
                type='primary' 
                onPress={() => navigation.navigate('Register')}
              />
            </ButtonsContainer>
            <GuestButton onPress={() => navigation.navigate('Home')}>
              <GuestButtonText>
                Continue como convidado
              </GuestButtonText>
            </GuestButton>
          </SrcContainer>
        </Body>
      </HomeContainer>
    </SafeAreaViewComponent>
  )
}



const styles = StyleSheet.create({
  swiper: {
    marginTop: 8
  }
})