import { SafeAreaViewComponent } from "../../styles";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Linking, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import Modal from 'react-native-modal';
import { Button } from "../../components/Button";

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
import { Ionicons } from '@expo/vector-icons';

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

const DEFAULT_HISTORY = 'Trabalho metodista em Santana de Parnaíba teve seu inpicio a partir da visão missionária da irmã Domitila Ladeia Gomes, membro da Igreja Metodista em Itaberaba, que, ao ler na estrada uma placa com o nome daquele município, em outubro de 1994, guardou-o em seu coração, indo inclusive visitar a cidade com a irmã Ruth Beloni';
const DEFAULT_ABOUT = 'Somos uma igreja dedicada ao amor a Deus e ao próximo, buscando compartilhar os princípios bíblicos de santidade, amor e graça. Temos 27 anos de história na cidade de Santana de Parnaíba e continuamos fazendo história através do poder de Deus que habita em nós. Venha você também fazer parte dessa história!';
const DEFAULT_MISSION = 'Salvar almas para Cristo!';
const DEFAULT_PASTOR = 'Conheça nosso dedicado pastor, que traz mensagens inspiradoras todos os domingos. Saiba sobre sua jornada, valores, e visão para nossa igreja';

export default function Info({ navigation }){
  const { isAdmin } = useContext(AuthContext);

  const endereco = "R. Canário, 41 - Jardim Deghi, Santana de Parnaíba - SP, 06502-175";

  const [history, setHistory] = useState(DEFAULT_HISTORY);
  const [about, setAbout] = useState(DEFAULT_ABOUT);
  const [mission, setMission] = useState(DEFAULT_MISSION);
  const [pastorText, setPastorText] = useState(DEFAULT_PASTOR);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'info'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.history) setHistory(data.history);
        if (data.about) setAbout(data.about);
        if (data.mission) setMission(data.mission);
        if (data.pastorText) setPastorText(data.pastorText);
      }
    }, (err) => {
      if (err.code !== 'permission-denied') {
        console.warn("Info listener error:", err);
      }
    });
    return () => unsubscribe();
  }, []);

  const openEditModal = (field, currentValue, title) => {
    setEditField(field);
    setEditValue(currentValue);
    setEditTitle(title);
    setModalVisible(true);
  };

  const saveEdit = async () => {
    if (!editValue.trim()) {
      Alert.alert("Atenção", "O texto não pode estar vazio.");
      return;
    }
    try {
      await setDoc(doc(db, 'config', 'info'), {
        history, about, mission, pastorText,
        [editField]: editValue.trim()
      });
      setModalVisible(false);
      Alert.alert("Sucesso", "Texto atualizado!");
    } catch (err) {
      console.warn('Info save error:', err.code || err.message);
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

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

  const EditButton = ({ onPress }) => (
    isAdmin ? (
      <TouchableOpacity onPress={onPress} style={styles.editButton}>
        <Ionicons name="create-outline" size={18} color="#3b82f6" />
        <Text style={{ color: '#3b82f6', fontSize: 12, marginLeft: 4 }}>Editar</Text>
      </TouchableOpacity>
    ) : null
  );

  // Build menu items inline so isAdmin is always fresh (avoids stale closure)
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

          <View style={styles.sectionHeaderRow}>
            <UsSectionTitle>Nossa história:</UsSectionTitle>
            <EditButton onPress={() => openEditModal('history', history, 'Nossa História')} />
          </View>

          <UsSectionContentText>
            {history}
          </UsSectionContentText>

          <ReadMoreButton>
            <ReadMoreButtonText>
              Ler mais
            </ReadMoreButtonText>
            <FontAwesome5 name="angle-right" size={20} color="black" />
          </ReadMoreButton>

          <View style={styles.sectionHeaderRow}>
            <UsSectionTitle>Nosso Pastor:</UsSectionTitle>
            <EditButton onPress={() => openEditModal('pastorText', pastorText, 'Texto do Pastor')} />
          </View>

          <PastorSection>
            <PastorImage source={Pastor} />
            <PastorTextContainer>
              <UsSectionContentText>
                {pastorText}
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
          <View style={styles.sectionHeaderRow}>
            <AboutSectionTitle>Sobre nós</AboutSectionTitle>
            <EditButton onPress={() => openEditModal('about', about, 'Sobre Nós')} />
          </View>
          <AboutSectionContentText>
            {about}
          </AboutSectionContentText>

          <AboutSectionImage source={LogoImageSrc}/>

          <View style={styles.sectionHeaderRow}>
            <AboutSectionTitle>Nossa missão</AboutSectionTitle>
            <EditButton onPress={() => openEditModal('mission', mission, 'Nossa Missão')} />
          </View>
          <AboutSectionContentText>
            {mission}
          </AboutSectionContentText>
        </AboutSectionContainer>
      )
    },
  ]
  const [selectedKey, setSelectedKey] = useState(2)

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
              <MenuItem key={item.key} onPress={() => setSelectedKey(item.key)} isSelected={item.key === selectedKey}>
                <MenuItemLabel>
                  {item.label}
                </MenuItemLabel>
              </MenuItem>
            ))}
          </MenuSrc>

          <MenuContent contentContainerStyle={{ paddingBottom: 80 }}>
            {menuItems.find(m => m.key === selectedKey)?.renderItem}
          </MenuContent>
          
        </MenuContainer>
      </HomeContainer>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text fontSize="lg" bold mb={3}>Editar: {editTitle}</Text>
          <TextInput
            style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
            value={editValue}
            onChangeText={setEditValue}
            multiline
          />
          <View style={{ marginTop: 16, gap: 8 }}>
            <Button label="Salvar" type="primary" onPress={saveEdit} />
            <Button label="Cancelar" type="secondary" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaViewComponent>
  )
}

const styles = StyleSheet.create({
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
  },
  input: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
})