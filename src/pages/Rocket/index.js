import React, { useContext, useEffect, useState } from 'react';
import { Alert, View, TextInput, StyleSheet } from 'react-native';
import { SafeAreaViewComponent } from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import { Button } from "../../components/Button";
import * as Clipboard from 'expo-clipboard';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import Modal from 'react-native-modal';
import { Text } from 'native-base';
import {
  RocketContainer,
  HeaderContainer,
  PageTitle,
  SubTitle,
  PixCard,
  PixLabel,
  PixKey,
  VerseContainer,
  VerseText
} from './styles';

const DEFAULT_PIX = "00.000.000/0001-00";
const DEFAULT_PIX_LABEL = "Chave PIX (CNPJ)";

export default function Rocket() {
  const { isAdmin } = useContext(AuthContext);
  const [pixKey, setPixKey] = useState(DEFAULT_PIX);
  const [pixLabel, setPixLabel] = useState(DEFAULT_PIX_LABEL);
  const [modalVisible, setModalVisible] = useState(false);
  const [editKey, setEditKey] = useState('');
  const [editLabel, setEditLabel] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'pix'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPixKey(data.key || DEFAULT_PIX);
        setPixLabel(data.label || DEFAULT_PIX_LABEL);
      }
    }, (err) => {
      if (err.code !== 'permission-denied') console.warn('Pix listener error:', err);
    });
    return () => unsubscribe();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(pixKey);
    Alert.alert("Sucesso", "Chave PIX copiada para a área de transferência!");
  };

  const openEditModal = () => {
    setEditKey(pixKey);
    setEditLabel(pixLabel);
    setModalVisible(true);
  };

  const savePixKey = async () => {
    if (!editKey.trim()) {
      Alert.alert("Atenção", "A chave PIX não pode estar vazia.");
      return;
    }
    try {
      await setDoc(doc(db, 'config', 'pix'), {
        key: editKey.trim(),
        label: editLabel.trim() || DEFAULT_PIX_LABEL
      });
      setModalVisible(false);
      Alert.alert("Sucesso", "Chave PIX atualizada!");
    } catch (err) {
      console.warn('PIX save error:', err.code || err.message);
      Alert.alert("Erro", "Não foi possível atualizar a chave PIX.");
    }
  };

  return (
    <SafeAreaViewComponent>
      <RocketContainer>
        <HeaderContainer>
          <Ionicons name="heart-circle-outline" size={64} color="white" />
          <PageTitle>Dízimos e Ofertas</PageTitle>
          <SubTitle>Contribua com a obra e ajude a nossa igreja a crescer.</SubTitle>
        </HeaderContainer>

        <PixCard>
          <PixLabel>{pixLabel}</PixLabel>
          <PixKey>{pixKey}</PixKey>
          <Button label="Copiar Chave PIX" type="primary" onPress={copyToClipboard} />
          {isAdmin && (
            <View style={{ marginTop: 12 }}>
              <Button label="✏️ Editar Chave PIX" type="secondary" onPress={openEditModal} />
            </View>
          )}
        </PixCard>

        <VerseContainer>
          <VerseText>
            "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria."
            {"\n\n"}
            2 Coríntios 9:7
          </VerseText>
        </VerseContainer>

        <View style={{ height: 32 }} />
      </RocketContainer>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text fontSize="lg" bold mb={3}>Editar Chave PIX</Text>
          <Text fontSize="sm" color="gray.500" mb={1}>Tipo (CNPJ, Celular, E-mail...)</Text>
          <TextInput
            style={styles.input}
            value={editLabel}
            onChangeText={setEditLabel}
            placeholder="Ex: Chave PIX (CNPJ)"
          />
          <Text fontSize="sm" color="gray.500" mb={1} mt={2}>Chave PIX</Text>
          <TextInput
            style={styles.input}
            value={editKey}
            onChangeText={setEditKey}
            placeholder="Digite a chave PIX"
          />
          <View style={{ marginTop: 16, gap: 8 }}>
            <Button label="Salvar" type="primary" onPress={savePixKey} />
            <Button label="Cancelar" type="secondary" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
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
  }
});
