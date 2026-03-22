// Arquivo principal do aplicativo

//Importando o container de navegação para poder navegar entre as telas
import { NavigationContainer } from '@react-navigation/native';
//Importando o container de estilização do native base para usar componentes já feitos na biblioteca
import { NativeBaseProvider } from 'native-base'

//Importando o arquivo onde são definidas as telas da aplicação
import Routes from './src/routes';

export default function App() {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
    
  );
}