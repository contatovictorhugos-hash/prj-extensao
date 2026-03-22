import { SafeAreaViewComponent } from "../../styles";

import {
  HeaderTitle,
  HomeContainer,
  LogoImage,
  MenuContainer,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuSrc,
  ScreenHeader,
} from "./styles";


import { 
  UsSectionContainer,
  UsSectionImage,
  UsSectionSinceText,
  UsSectionTitle,
  UsSectionContentText,
  ReadMoreButton,
  ReadMoreButtonText,
  PastorSection,
  PastorImage,
  PastorTextContainer
} from "./usSectionStyle";

import LogoImageSrc from '../../../assets/MetodistaLogo.png'
import NosImagem from '../../../assets/NosImagem.jpg'
import Pastor from '../../../assets/pastor.jpg'
import Location from '../../../assets/Location.png'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

import { StyleSheet, Text, View, Linking } from 'react-native'
import { useState } from "react";
import { 
  AddressText,
  ContactItem,
  ContactsContainer,
  ContactSectionContainer, 
  ContactSectionTitle, 
  ContactValueText, 
  GoForButton, 
  GoForButtonText, 
  MapImage
} from "./contactSectionStyle";
import { AboutSectionContainer, AboutSectionContentText, AboutSectionImage, AboutSectionTitle } from "./aboutSectionStyle";

export default function Info({ navigation }){
  const endereco = "R. Canário, 41 - Jardim Deghi, Santana de Parnaíba - SP, 06502-175";

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    Linking.openURL(url);
  }

  const contacts = [
    {
      icon: <Entypo name="phone" size={50} color="black" />,
      value: '+55 (11) 96450-4244'
    },
    {
      icon: <FontAwesome5 name="whatsapp" size={50} color="black" />,
      value: '+55 (11) 96450-4244'
    },
    {
      icon: <Entypo name="facebook" size={50} color="black" />,
      value: 'Metodista Santana de Parnaíba'
    },
    {
      icon: <Entypo name="youtube" size={50} color="black" />,
      value: 'Metodista Santana de Parnaíba'
    },
    {
      icon: <Entypo name="instagram" size={50} color="black" />,
      value: '@metodista.santanadeparnaiba'
    }
  ]

  const menuItems = [
    {
      key: 1,
      label: 'Nós',
      renderItem: (
        <UsSectionContainer>
          <UsSectionImage source={NosImagem}/>

          <UsSectionSinceText>
            Desde 1996
          </UsSectionSinceText>

          <UsSectionTitle>
            Nossa história: 
          </UsSectionTitle>

          <UsSectionContentText>
            Trabalho metodista em Santana de Parnaíba teve seu inpicio a partir da visão missionária da irmã Domitila Ladeia Gomes, membro da Igreja Metodista em Itaberaba, que, ao ler na estrada uma placa com o nome daquele município, em outubro de 1994, guardou-o em seu coração, indo inclusive visitar a cidade com a irmã Ruth Beloni
          </UsSectionContentText>

          <ReadMoreButton>
            <ReadMoreButtonText>
              Ler mais
            </ReadMoreButtonText>

            <FontAwesome5 name="angle-right" size={20} color="black" />
          </ReadMoreButton>


          <UsSectionTitle>
            Nosso Pastor:
          </UsSectionTitle>

          <PastorSection>
            <PastorImage source={Pastor} />

            <PastorTextContainer>
              <UsSectionContentText>
                Conheça nosso dedicado pastor, que traz mensagens inspiradoras todos os domingos. Saiba sobre sua jornada, valores, e visão para nossa igreja
              </UsSectionContentText>
            </PastorTextContainer>
            
          </PastorSection>
        </UsSectionContainer>
      )
    },
    {
      key: 2,
      label: 'Contato',
      renderItem: (
        <ContactSectionContainer>
          <ContactSectionTitle>Igreja metodista em Santana de Parnaíba</ContactSectionTitle>

          <MapImage source={Location} />
          <AddressText>
            {endereco}
          </AddressText>

          <GoForButton onPress={openGoogleMaps}>
            <GoForButtonText>
              Como chegar
            </GoForButtonText>
          </GoForButton>


          <ContactsContainer>
            {contacts.map((item, index) => (
              <ContactItem key={index}>
                {item.icon}
                <ContactValueText>
                  {item.value}
                </ContactValueText>
              </ContactItem>
            ))}
          </ContactsContainer>
        </ContactSectionContainer>
      )
    },
    {
      key: 3,
      label: 'Sobre',
      renderItem: (
        <AboutSectionContainer>
          <AboutSectionTitle>Sobre nós</AboutSectionTitle>
          <AboutSectionContentText>
            Somos uma igreja dedicada ao amor a Deus e ao próximo, buscando compartilhar os princípios bíblicos de santidade, amor e graça
          </AboutSectionContentText>
          <AboutSectionContentText>
            Temos 27 anos de história na cidade de Santana de Parnaíba e continuamos fazendo história através do poder de Deus que habita em nós.
          </AboutSectionContentText>
          <AboutSectionContentText>
            Venha você também fazer parte dessa história!
          </AboutSectionContentText>

          <AboutSectionImage source={LogoImageSrc}/>

          <AboutSectionTitle>Nossa missão</AboutSectionTitle>
          <AboutSectionContentText>
            Salvar almas para Cristo!
          </AboutSectionContentText>
        </AboutSectionContainer>
      )
    },
  ]
  const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[1])

  return (
    <SafeAreaViewComponent>
      <HomeContainer>
        <ScreenHeader>
          <HeaderTitle>
            Metodista de Santana de Parnaíba
          </HeaderTitle>
          <LogoImage source={LogoImageSrc} />
        </ScreenHeader>

        <MenuContainer>
          <MenuSrc>
            {menuItems.map((item) => (
              <MenuItem key={item.key} onPress={() => setSelectedMenuItem(item)} isSelected={item?.key === selectedMenuItem?.key}>
                <MenuItemLabel>
                  {item.label}
                </MenuItemLabel>
              </MenuItem>
            ))}
          </MenuSrc>

          <MenuContent>
            {selectedMenuItem.renderItem}
          </MenuContent>
          
        </MenuContainer>
      </HomeContainer>
    </SafeAreaViewComponent>
  )
}



const styles = StyleSheet.create({
  swiper: {
    marginTop: 8
  }
})