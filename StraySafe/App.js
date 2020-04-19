import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Home'
import ThreadList from './src/components/ThreadList'
import CreateThread from './src/components/CreateThread'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux'
import store from './src/store'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import ThreadDetail from './src/components/ThreadDetail';
import MyCats from './src/components/MyCats';
import Adopt from './src/components/Adopt';
import AdoptDetail from './src/components/AdoptDetail';
import OwnerContact from './src/components/OwnerContact';
import AddPet from './src/components/AddPet';
import lib from './src/components/ColorLib';

const Drawer = createDrawerNavigator();
const StackAdopt = createStackNavigator();

export function AdoptStack() {
  return (
    <StackAdopt.Navigator initialRouteName="Adopt">
      <StackAdopt.Screen name="Adopt" component={Adopt} options={{ headerShown: false }} />
      <StackAdopt.Screen name="Adopt Detail" component={AdoptDetail} />
      <StackAdopt.Screen name="Owner Contact" component={OwnerContact} />
    </StackAdopt.Navigator>
  )
}

const StackMyCats = createStackNavigator();

export function MyCatsStack() {
  return (
    <StackMyCats.Navigator initialRouteName="My Cats">
      <StackMyCats.Screen name="My Cats" component={MyCats} />
      <StackMyCats.Screen name="Details" component={AdoptDetail} />
    </StackMyCats.Navigator>
  )
}

const StackThread = createStackNavigator();

export function ThreadStack() {
  return (
    <StackThread.Navigator>
      <StackThread.Screen name="Thread List" component={ThreadList} />
    </StackThread.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Adopt"
            drawerStyle={{ backgroundColor: '#0A2239' }}
            drawerContentOptions={{ inactiveTintColor: '#FFFFFF', activeTintColor: lib.primary, activeBackgroundColor: '#1D84B5' }}
          >
            <Drawer.Screen name="Adopt" component={AdoptStack} />
            <Drawer.Screen name="My Cats" component={MyCatsStack} options={{ drawerLabel: 'My Cats' }} />
            <Drawer.Screen name="Add Pet" component={AddPet} options={{ drawerLabel: 'Add Pet' }} />
            <Drawer.Screen name="Thread List" component={ThreadStack} options={{ drawerLabel: 'Thread List' }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
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
});


export default App