import React, { useContext, useState } from 'react';
import { SafeAreaViewComponent } from '../../styles';
import { AuthContext } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Button } from "../../components/Button";
import { View, Alert, TextInput, StyleSheet, Image, TouchableOpacity, Text, Platform, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../services/firebaseConfig';
import {
  ProfileContainer,
  HeaderContainer,
  AvatarImage,
  ProfileName,
  ProfileEmail,
  InfoCard,
  InfoRow,
  InfoTextContainer,
  InfoLabel,
  InfoValue,
  LogoutButtonContainer
} from './styles';

export default function Profile({ navigation }) {
  const { userData, user, signOut } = useContext(AuthContext);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editDateOfBirth, setEditDateOfBirth] = useState('');
  const [editImageUri, setEditImageUri] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          onPress: async () => {
            await signOut();
            navigation.navigate('Login');
          },
          style: "destructive"
        }
      ]
    );
  };

  const openEditModal = () => {
    setEditName(userData?.name || '');
    setEditPhone(userData?.phone || '');
    setEditDateOfBirth(userData?.dateOfBirth || '');
    setEditImageUri(null);
    setEditModalVisible(true);
  };

  const handlePhoneEdit = (text) => {
    let cleaned = ('' + text).replace(/\D/g, '');
    if (cleaned.length > 11) cleaned = cleaned.substring(0, 11);
    const len = cleaned.length;
    if (len <= 2) setEditPhone(cleaned);
    else if (len <= 7) setEditPhone(`(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`);
    else setEditPhone(`(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`);
  };

  const handleDateEdit = (text) => {
    let cleaned = ('' + text).replace(/\D/g, '');
    if (cleaned.length > 8) cleaned = cleaned.substring(0, 8);
    const len = cleaned.length;
    if (len <= 2) setEditDateOfBirth(cleaned);
    else if (len <= 4) setEditDateOfBirth(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    else setEditDateOfBirth(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`);
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setEditImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!editName.trim()) {
      Alert.alert('Atenção', 'O nome não pode estar vazio.');
      return;
    }
    setSaving(true);
    try {
      let avatarUrl = userData?.avatarUrl || '';
      if (editImageUri) {
        const response = await fetch(editImageUri);
        const blob = await response.blob();
        const fileRef = ref(storage, `avatars/${user.uid}.jpg`);
        await uploadBytes(fileRef, blob);
        avatarUrl = await getDownloadURL(fileRef);
      }
      await updateDoc(doc(db, 'users', user.uid), {
        name: editName.trim(),
        phone: editPhone,
        dateOfBirth: editDateOfBirth,
        avatarUrl
      });
      setEditModalVisible(false);
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (err) {
      console.warn('Profile update error:', err.code || err.message);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    } finally {
      setSaving(false);
    }
  };

  if (!user && !userData) {
    return (
      <SafeAreaViewComponent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="person-circle-outline" size={80} color="#9ca3af" />
          <ProfileName style={{ color: 'black', marginTop: 16 }}>Modo Visitante</ProfileName>
          <View style={{ marginTop: 24, width: '80%' }}>
            <Button label="Fazer Login" type="primary" onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </SafeAreaViewComponent>
    );
  }

  const avatarSource = editImageUri
    ? { uri: editImageUri }
    : userData?.avatarUrl
      ? { uri: userData.avatarUrl }
      : null;

  return (
    <SafeAreaViewComponent>
      <ProfileContainer>
        <HeaderContainer>
          {userData?.avatarUrl ? (
            <AvatarImage source={{ uri: userData.avatarUrl }} />
          ) : (
            <Ionicons name="person-circle-outline" size={120} color="white" />
          )}
          <ProfileName>{userData?.name || 'Membro'}</ProfileName>
          <ProfileEmail>{user?.email || userData?.email}</ProfileEmail>
        </HeaderContainer>

        <InfoCard>
          <InfoRow>
            <Ionicons name="call-outline" size={24} color="#4f46e5" />
            <InfoTextContainer>
              <InfoLabel>Celular</InfoLabel>
              <InfoValue>{userData?.phone || 'Não informado'}</InfoValue>
            </InfoTextContainer>
          </InfoRow>

          <InfoRow>
            <Ionicons name="calendar-outline" size={24} color="#4f46e5" />
            <InfoTextContainer>
              <InfoLabel>Data de Nascimento</InfoLabel>
              <InfoValue>{userData?.dateOfBirth || 'Não informado'}</InfoValue>
            </InfoTextContainer>
          </InfoRow>
        </InfoCard>

        <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
          <Button label="Editar Perfil" type="secondary" onPress={openEditModal} />
        </View>

        <LogoutButtonContainer>
          <Button label="Sair da Conta" type="secondary" onPress={handleLogout} />
        </LogoutButtonContainer>
      </ProfileContainer>

      <Modal isVisible={editModalVisible} onBackdropPress={() => setEditModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <TouchableOpacity onPress={selectImage} style={styles.avatarPicker}>
              {avatarSource ? (
                <Image source={avatarSource} style={styles.avatarPreview} />
              ) : (
                <Ionicons name="camera-outline" size={40} color="#6b7280" />
              )}
              <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Alterar foto</Text>
            </TouchableOpacity>

            <Text style={styles.modalLabel}>Nome</Text>
            <TextInput style={styles.input} value={editName} onChangeText={setEditName} placeholder="Seu nome" placeholderTextColor="#9ca3af" />

            <Text style={[styles.modalLabel, { marginTop: 8 }]}>Telefone</Text>
            <TextInput style={styles.input} value={editPhone} onChangeText={handlePhoneEdit} placeholder="(XX) XXXXX-XXXX" placeholderTextColor="#9ca3af" keyboardType="phone-pad" maxLength={15} />

            <Text style={[styles.modalLabel, { marginTop: 8 }]}>Data de Nascimento</Text>
            <TextInput style={styles.input} value={editDateOfBirth} onChangeText={handleDateEdit} placeholder="dd/mm/yyyy" placeholderTextColor="#9ca3af" keyboardType="numeric" maxLength={10} />

            <View style={{ marginTop: 16, gap: 8 }}>
              <Button label={saving ? "Salvando..." : "Salvar"} type="primary" onPress={handleSave} disabled={saving} />
              <Button label="Cancelar" type="secondary" onPress={() => setEditModalVisible(false)} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    maxHeight: '90%',
  },
  input: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  avatarPicker: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 60,
    width: 100,
    height: 100,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarPreview: {
    width: 100,
    height: 100,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  }
});
