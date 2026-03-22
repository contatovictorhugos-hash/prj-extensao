import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';


// Criando uma tab nagivator para definir as telas da aplicação
const Tab = createBottomTabNavigator();

// Importando os componentes da tela Login e Register
import Login from './pages/Login';
import Register from './pages/Register';
import ComingSoon from './pages/ComingSoon';
import { TabBarIconButton } from './styles';
import Info from './pages/Info';

export default function Routes(){
  return (

    // Aqui é utilizado o Navigator como um container para as Screens
    // é definido que a tela inicial da aplicação sera a tela Login e nessas telas, apliquei um display none na tabBar 
    <Tab.Navigator
      initialParams={{ initialScreen: 'Login' }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black'
      }}
    > 
    
      {/* Definição da tela, onde temos a name para sua identificação, o componente a ser renderizado, e que o nome da tela não irá aparecer no topo da tela */}
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="Rocket"
        component={ComingSoon}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabBarIconButton isFocused={focused}>
              <Entypo name="rocket" size={24} color={color} />
            </TabBarIconButton>
          )
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={ComingSoon}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabBarIconButton isFocused={focused}>
              <Entypo name="calendar" size={24} color={color} />
            </TabBarIconButton>
          )
        }}
      />
      <Tab.Screen
        name="Home"
        component={ComingSoon}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabBarIconButton isFocused={focused}>
              <Entypo name="home" size={24} color={color} />
            </TabBarIconButton>
          )
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabBarIconButton isFocused={focused}>
              <AntDesign name="questioncircle" size={24} color={color} />
            </TabBarIconButton>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ComingSoon}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabBarIconButton isFocused={focused}>
              <Ionicons name="person" size={24} color={color} />
            </TabBarIconButton>
          )
        }}
      />
    </Tab.Navigator>
  )
}