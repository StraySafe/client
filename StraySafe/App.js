import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux'
import {store, persistor} from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, Button, Icon } from '@ui-kitten/components'
import ThreadDetail from './src/components/ThreadDetail';
import ThreadList from './src/components/ThreadList'
import CreateThread from './src/components/CreateThread'
import MyCats from './src/components/MyCats';
import Adopt from './src/components/Adopt';
import AdoptDetail from './src/components/AdoptDetail';
import OwnerContact from './src/components/OwnerContact';
import AddPet from './src/components/AddPet';
import RegisterForm from './src/components/RegisterForm'


import lib from './src/components/ColorLib'

const Drawer = createDrawerNavigator();
const StackAdopt = createStackNavigator();


export function AdoptStack({ navigation }) {
  return (
    <StackAdopt.Navigator>
      <StackAdopt.Screen name="Adopt" component={Adopt} options={{
        headerLeft: () => (
          <Button
            style={styles.drawerButton}
            onPress={() => navigation.openDrawer()}
            title="Info"
            color="#fff"
          />
        ),
      }}/>
      <StackAdopt.Screen name="Adopt Detail" component={AdoptDetail} />
      <StackAdopt.Screen name="Owner Contact" component={OwnerContact} />
    </StackAdopt.Navigator>
  )
}

const StackMyCats = createStackNavigator();

export function MyCatsStack({ navigation }) {
  return (
    <StackMyCats.Navigator>
      <StackMyCats.Screen name="My Cats" component={MyCats} options={{
        headerLeft: () => (
          <Button
            style={styles.drawerButton}
            onPress={() => navigation.openDrawer()}
            title="Info"
            color="#fff"
          />
        ),
      }}/>
    </StackMyCats.Navigator>
  )
}

const StackThread = createStackNavigator();

export function CreateThreadStack({ navigation }) {
  return (
    <StackThread.Navigator>
      <StackThread.Screen name='Create Thread' component={CreateThread} options={{
        headerLeft: () => (
          <Button
            style={styles.drawerButton}
            onPress={() => navigation.openDrawer()}
            title="Info"
            color="#fff"
          />
        ),
      }} />
    </StackThread.Navigator>
  )
}

const StackHome = createStackNavigator();

export function ThreadStack({ navigation }) {
  return (
    <StackThread.Navigator>
      <StackThread.Screen name='Thread list' component={ThreadList} options={{
        headerLeft: () => (
          <Button
            style={styles.drawerButton}
            onPress={() => navigation.openDrawer()}
            title="Info"
            color="#fff"
          />
        ),
      }}/>
      <StackThread.Screen name='Thread Detail' component={ThreadDetail} />
    </StackThread.Navigator>
  )
}

export function StackHomeNavigate({ navigation }) {
  return (
    <StackHome.Navigator>
      <StackHome.Screen name='Home' component={Home} />
      <StackHome.Screen name='Register Form' component={RegisterForm} />
    </StackHome.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
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
            <Drawer.Screen name="Create Thread" component={CreateThreadStack} options={{ drawerLabel: 'Create Thread' }} />
            <Drawer.Screen name="Home" component={StackHomeNavigate} options={{drawerLabel: "Home"}} />
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