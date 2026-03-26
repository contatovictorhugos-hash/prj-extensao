import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


// Criando uma tab nagivator para definir as telas da aplicação
const Tab = createBottomTabNavigator();

import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Rocket from './pages/Rocket';
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
        name="SignIn"
        component={SignIn}
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
        component={Rocket}
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
        component={Calendar}
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
        component={Home}
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
              <Ionicons name="help-circle-outline" size={24} color={color} />
            </TabBarIconButton>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
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