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

const Drawer = createDrawerNavigator();
const StackAdopt = createStackNavigator();

export function AdoptStack() {
  return (
    <StackAdopt.Navigator>
      <StackAdopt.Screen name="Adopt" component={Adopt} />
      <StackAdopt.Screen name="Adopt Detail" component={AdoptDetail} />
      <StackAdopt.Screen name="Owner Contact" component={OwnerContact} />
    </StackAdopt.Navigator>
  )
}

const StackMyCats = createStackNavigator();

export function MyCatsStack() {
  return (
    <StackMyCats.Navigator>
      <StackMyCats.Screen name="My Cats" component={MyCats} />
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
            drawerContentOptions={{ inactiveTintColor: '#FFFFFF' }}
          >
            <Drawer.Screen name="Adopt" component={AdoptStack} />
            <Drawer.Screen name="My Cats" component={MyCatsStack} options={{ drawerLabel: 'My Cats' }} />
            <Drawer.Screen name="Add Pet" component={AddPet} options={{ drawerLabel: 'Add Pet' }} />
            <Drawer.Screen name="Thread List" component={ThreadStack} options={{ drawerLabel: 'Thread List' }} />
          </Drawer.Navigator>
          {/* <Stack.Navigator> */}
          {/* <Stack.Screen name="Adopt" component={Adopt} /> */}
          {/* <Stack.Screen name="Add Pet" component={AddPet} /> */}
          {/* <Stack.Screen name="My Cats" component={MyCats} /> */}
          {/* <Stack.Screen name="Adopt Detail" component={AdoptDetail} /> */}
          {/* <Stack.Screen name="Owner Contact" component={OwnerContact} /> */}
          {/* <Stack.Screen name='Thread List' component={ThreadList} />
            <Stack.Screen name='Thread Detail' component={ThreadDetail} />
            <Stack.Screen name='Create Thread' component={CreateThread} />
            <Stack.Screen name='Home' component={Home} /> */}
          {/* </Stack.Navigator> */}
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