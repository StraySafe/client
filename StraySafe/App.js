import React, { Profiler } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux'
import { store, persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, Button, Icon } from '@ui-kitten/components'
import ThreadDetail from './src/components/ThreadDetail';
import ThreadList from './src/components/ThreadList'
import CreateThread from './src/components/CreateThread'
import MyCats from './src/components/MyCats';
import Adopt from './src/components/Adopt';
import PetDetail from './src/components/PetDetail';
import OwnerContact from './src/components/OwnerContact';
import AddPet from './src/components/AddPet';
import RegisterForm from './src/components/RegisterForm'

import Profile from './src/components/Profile';
import lib from './src/components/ColorLib';

const Drawer = createDrawerNavigator();
const StackAdopt = createStackNavigator();
const Stack = createStackNavigator()


const Header = (navigation, title) => {
  return {
    headerLeft: () => <Button onPress={() => navigation.openDrawer()}>Menu</Button>,
    headerTitle: () => <View style={{ flexDirection: "row", height: 60, backgroundColor: lib.primary, justifyContent: 'center', alignItems: 'center' }}><Text style={{ flex: 3, color: lib.white, fontWeight: '700', fontSize: 16 }} >{title}</Text></View>,
    headerBackground: () => <View style={{ flexDirection: "row", height: 60, backgroundColor: lib.primary, justifyContent: 'center', alignItems: 'center' }} />
  }
}


export function AdoptStack() {
  return (
    <StackAdopt.Navigator initialRouteName="Adopt">
      <StackAdopt.Screen name="Adopt" component={Adopt} options={{ headerShown: false }} />
      <StackAdopt.Screen name="Adopt Detail" component={PetDetail} options={{ headerShown: false }} />
      <StackAdopt.Screen name="Owner Contact" component={OwnerContact} options={{ headerShown: false }} />
    </StackAdopt.Navigator>
  )
}

const StackMyCats = createStackNavigator();

export function MyCatsStack() {
  return (
    <StackMyCats.Navigator initialRouteName="My Cats">
      <StackMyCats.Screen name="My Cats" component={MyCats} options={{ headerShown: false }} />
      <StackMyCats.Screen name="Pet Detail" component={PetDetail} options={{ headerShown: false }} />
    </StackMyCats.Navigator>
  )
}

const StackThread = createStackNavigator();

export function CreateThreadStack() {
  return (
    <StackThread.Navigator>
      <StackThread.Screen name='Create Thread' component={CreateThread} options={{ headerShown: false }}  />
    </StackThread.Navigator>
  )
}


export function AddNewPet() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Add Pet' component={AddPet} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export function MyProfile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const StackHome = createStackNavigator();

export function ThreadStack() {
  return (
    <StackThread.Navigator>
      <StackThread.Screen name='Thread list' component={ThreadList} options={{ headerShown: false }} />
      <StackThread.Screen name='Thread Detail' component={ThreadDetail} options={{ headerShown: false }} />
    </StackThread.Navigator>
  )
}


export function DrawerNavigators() {
  return (
    <Drawer.Navigator
      initialRouteName="Thread List"
      drawerStyle={{ backgroundColor: '#0A2239' }}
      drawerContentOptions={{ inactiveTintColor: '#FFFFFF', activeTintColor: lib.primary, activeBackgroundColor: '#1D84B5' }}
    >
      <Drawer.Screen name="Profile" component={MyProfile} />
      <Drawer.Screen name="Thread List" component={ThreadStack} options={{ drawerLabel: 'Thread List' }} />
      <Drawer.Screen name="Adopt" component={AdoptStack} />
      <Drawer.Screen name="My Cats" component={MyCatsStack} options={{ drawerLabel: 'My Cats' }} />
      <Drawer.Screen name="Add Pet" component={AddNewPet} options={{ drawerLabel: 'Add Pet' }} />
      <Drawer.Screen name="Create Thread" component={CreateThreadStack} options={{ drawerLabel: 'Create Thread' }} />
    </Drawer.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
              <Stack.Screen name='Register Form' component={RegisterForm} />
              <Stack.Screen name='Content' component={DrawerNavigators} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerButton: {
    marginHorizontal: 15,
    backgroundColor: lib.accent,
  }
});


export default App