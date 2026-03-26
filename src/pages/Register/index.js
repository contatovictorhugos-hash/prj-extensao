import { StyleSheet, Image, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../services/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { 
  AvatarInputContainer,
  CancelButton, 
  FormContainer, 
  FormIcon, 
  FormInput, 
  FormInputName, 
  FormItem, 
  FormItemName, 
  FormLabel, 
  HeaderContainer, 
  HeaderTitle, 
  RegisterContainter, 
  SrcContainer 
} from "./styles";
import { SafeAreaViewComponent } from '../../styles';
import { useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Button } from "../../components/Button";
import { Text, Button as NativeButton } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

export default function Register({ navigation }) {
  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [imageUri, setImageUri] = useState(null)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePhoneChange = (text) => {
    let cleaned = ('' + text).replace(/\D/g, '');
    let len = cleaned.length;
    
    if (len > 11) cleaned = cleaned.substring(0, 11);
    
    if (len <= 2) {
      setPhone(cleaned);
    } else if (len <= 7) {
      setPhone(`(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`);
    } else {
      setPhone(`(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`);
    }
  };

  const handleDateChange = (text) => {
    let cleaned = ('' + text).replace(/\D/g, '');
    let len = cleaned.length;

    if (len > 8) cleaned = cleaned.substring(0, 8);

    if (len <= 2) {
      setDateOfBirth(cleaned);
    } else if (len <= 4) {
      setDateOfBirth(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setDateOfBirth(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`);
    }
  };



  const onFinish = async () => {
    if (!email || !password || !name) {
      Alert.alert('Atenção', 'E-mail, senha e nome são obrigatórios.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (dateOfBirth) {
      const parts = dateOfBirth.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!parts) {
        Alert.alert('Atenção', 'Data de nascimento deve estar no formato dd/mm/yyyy.');
        return;
      }
      const [, day, month, year] = parts.map(Number);
      const currentYear = new Date().getFullYear();
      if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > currentYear) {
        Alert.alert('Atenção', 'Data de nascimento inválida.');
        return;
      }
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      let avatarUrl = "";
      if (imageUri) {
         const response = await fetch(imageUri);
         const blob = await response.blob();
         const fileRef = ref(storage, `avatars/${user.uid}.jpg`);
         await uploadBytes(fileRef, blob);
         avatarUrl = await getDownloadURL(fileRef);
      }

      await setDoc(doc(db, 'users', user.uid), {
         name,
         dateOfBirth,
         email,
         phone,
         avatarUrl
      });
      
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate('Home');
    } catch(err) {
      console.warn('Register error:', err.code);
      let errorMessage = "Não foi possível criar a conta. Tente novamente.";
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "Este e-mail já está cadastrado.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "E-mail inválido.";
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "A senha é muito fraca. Use pelo menos 6 caracteres.";
      }
      
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  }


  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        extraScrollHeight={100}
        enableOnAndroid={true}
      >
        <RegisterContainter>
          <HeaderContainer>
            <HeaderTitle>
              Register
            </HeaderTitle>
            <CancelButton onPress={() => navigation.navigate('Login')}>
              <Text>Cancelar</Text>
            </CancelButton>
          </HeaderContainer>

          
            <FormContainer>
              <AvatarInputContainer>
                <NativeButton onPress={selectImage} backgroundColor='transparent' borderColor='black' borderWidth={1} padding={imageUri ? 0 : 2}>
                  {imageUri
                    ? <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
                    : <Ionicons name="person-add-outline" size={64} color="black" />}
                </NativeButton>
                <Text fontSize="lg" >Escolha sua foto de perfil</Text>
              </AvatarInputContainer>

              <FormItemName>
                <FormLabel>
                  Nome
                </FormLabel>
                <FormInputName placeholder="John" value={name} onChangeText={(value) => setName(value)} />
              </FormItemName>
              <FormItem>
                <FormIcon>
                  <MaterialIcons name="cake" size={32} color="black" />
                </FormIcon>
                <FormInput placeholder="dd/mm/yyyy" value={dateOfBirth} onChangeText={handleDateChange} keyboardType="numeric" maxLength={10} />
              </FormItem>
              <FormItem>
                <FormIcon>
                  <Ionicons name="mail" size={32} color="black" />
                </FormIcon>
                <FormInput placeholder="nome@exemplo.com" value={email} onChangeText={(value) => setEmail(value)} autoCapitalize="none" keyboardType="email-address"/>
              </FormItem>
              <FormItem>
                <FormIcon>
                  <Ionicons name="lock-closed" size={32} color="black" />
                </FormIcon>
                <FormInput placeholder="Senha" value={password} onChangeText={(value) => setPassword(value)} secureTextEntry={true} />
              </FormItem>
              <FormItem>
                <FormIcon>
                  <FontAwesome name="phone" size={32} color="black" />
                </FormIcon>
                <FormInput placeholder="(XX) XXXXX-XXXX" value={phone} onChangeText={handlePhoneChange} keyboardType="phone-pad" maxLength={15} />
              </FormItem>
            </FormContainer>

          <SrcContainer>
            <Button label={loading ? "Carregando..." : "Cadastrar"} type="primary" onPress={onFinish} disabled={loading}/>
          </SrcContainer>

        </RegisterContainter>
      </KeyboardAwareScrollView>
    </SafeAreaViewComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});