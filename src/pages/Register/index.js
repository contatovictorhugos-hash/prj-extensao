import { StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { 
  AvatarInputContainer,
  CancelButton, 
  CityStateZipCodeContainer, 
  FormCityInput, 
  FormContainer, 
  FormIcon, 
  FormInput, 
  FormInputName, 
  FormItem, 
  FormItemName, 
  FormLabel, 
  FormZipCodeInput, 
  HeaderContainer, 
  HeaderTitle, 
  RegisterContainter, 
  SrcContainer 
} from "./styles";
import { SafeAreaViewComponent } from '../../styles';
import { useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Button } from "../../components/Button";
import { Text, Select, Button as NativeButton } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

export default function Register({ navigation }) {
  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [state, setState] = useState('')
  const [imageUri, setImageUri] = useState(null);


  const states = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" }
  ]

  const onFinish = () => {
    setName('')
    setDateOfBirth('')
    setEmail('')
    setPhone('')
    setAddress('')
    setCity('')
    setZipCode('')
    setState('')
    setImageUri(null)

    navigation.navigate('Home')
  }


  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 100, y: 100 }}
        scrollEnabled={true}
        extraScrollHeight={50}
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
                <FormInput placeholder="01-01-1990" value={dateOfBirth} onChangeText={(value) => setDateOfBirth(value)} />
              </FormItem>
              <FormItem>
                <FormIcon>
                  <Ionicons name="mail" size={32} color="black" />
                </FormIcon>
                <FormInput placeholder="nome@exemplo.com" value={email} onChangeText={(value) => setEmail(value)} />
              </FormItem>
              <FormItem>
                <FormIcon>
                  <FontAwesome name="phone" size={32} color="black" />
                </FormIcon>
                <FormInput placeholder="Número de telefone" value={phone} onChangeText={(value) => setPhone(value)} />
              </FormItem>
              <FormItem>
                <FormIcon>
                  <FontAwesome5 name="map-marker-alt" size={32} color="black" />
                </FormIcon>
                <FormInput placeholder="Endereço" value={address} onChangeText={(value) => setAddress(value)} />
              </FormItem>
              <FormItem>
                <FormIcon>
                </FormIcon>
                <CityStateZipCodeContainer>
                  <FormCityInput placeholder="Cidade" value={city} onChangeText={(value) => setCity(value)} />
                  <Select
                    minWidth="30%"
                    accessibilityLabel="Estado"
                    placeholder="Estado"
                    selectedValue={state}
                    onValueChange={(value) => setState(value)}
                    borderRadius={8}
                    dropdownIcon={() => (<></>)}
                    fontSize="16"
                  >
                    {states.map(state => (
                      <Select.Item label={state.label} value={state.value} key={state.value} />
                    ))}
                  </Select>
                  <FormZipCodeInput placeholder="Cep" value={zipCode} onChangeText={(value) => setZipCode(value)} />
                </CityStateZipCodeContainer>
              </FormItem>
            </FormContainer>

          <SrcContainer>
            <Button label="Continue" type="primary" onPress={() => onFinish()}/>
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