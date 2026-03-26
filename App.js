// Arquivo principal do aplicativo
import { BackHandler, Linking } from 'react-native';

// Polyfill para compatibilidade com bibliotecas antigas no React Native 0.65+
if (typeof BackHandler.removeEventListener !== 'function') {
  BackHandler.removeEventListener = () => {};
}
if (typeof Linking.removeEventListener !== 'function') {
  Linking.removeEventListener = () => {};
}


//Importando o container de navegação para poder navegar entre as telas
import { NavigationContainer } from '@react-navigation/native';
//Importando o container de estilização do native base para usar componentes já feitos na biblioteca
import { NativeBaseProvider } from 'native-base'

//Importando o arquivo onde são definidas as telas da aplicação
import Routes from './src/routes';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AuthProvider>
    </NativeBaseProvider>
    
  );
}