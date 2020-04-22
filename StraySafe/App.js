import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Home from './src/components/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider, useSelector, useDispatch } from 'react-redux'
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
import { Entypo } from '@expo/vector-icons';
import Profile from './src/components/Profile';
import lib from './src/components/ColorLib';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const Drawer = createDrawerNavigator();
const StackAdopt = createStackNavigator();
const Stack = createStackNavigator()

function CustomDrawer({ navigation }, currentUserData) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: lib.primary }}>
      <ScrollView style={{ marginTop: 15 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={{ padding: 15, flexDirection: 'row' }}>
              <Image source={ currentUserData.img_url ? { uri: currentUserData.img_url } : require('./assets/userplaceholder.png') } style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 80 / 2 }} />
              <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 20, color: lib.white, fontWeight: '500' }}>{currentUserData.first_name}</Text>
                <Text style={{ fontSize: 14, color: lib.accent }}>{currentUserData.city}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: lib.accent,
              borderBottomWidth: 0.5,
              
            }}
          />
          <TouchableOpacity style={{ padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ color: lib.white, fontWeight: 'bold', fontSize: 20 }}>StraySafe</Text>
            <Image source={require('./assets/threadlogo.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 12.5, paddingLeft: 40, flexDirection: 'row' }} onPress={() => navigation.navigate('Thread List')}>
            <Text style={{ color: lib.accent }}>Threads</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 12.5, paddingLeft: 40 }} onPress={() => navigation.navigate('Create Thread')}>
            <Text style={{ color: lib.accent }}>Create Thread</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: lib.white, fontWeight: 'bold', fontSize: 20 }}>StrayAdopt</Text>
            <Image source={require('./assets/adoptlogo.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 12.5, paddingLeft: 40 }} onPress={() => navigation.navigate('Adopt')}>
            <Text style={{ color: lib.accent }}>Adopt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 12.5, paddingLeft: 40 }} onPress={() => navigation.navigate('My Cats')}>
            <Text style={{ color: lib.accent }}>Adopt Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 12.5, paddingLeft: 40 }} onPress={() => navigation.navigate('Add Pet')}>
            <Text style={{ color: lib.accent }}>Add Pet</Text>
          </TouchableOpacity>

        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={{ padding: 15 }}>
            <Text style={{ color: 'red' }}>Logout</Text>
          </TouchableOpacity>

          <Image source={require('./assets/smalllogo.png')} style={{ resizeMode: 'cover', height: 80, width: 220 }} />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
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
      <StackAdopt.Screen name="Owner Contact" component={OwnerContact} options={{ headerShown: false }} />
    </StackMyCats.Navigator>
  )
}

const StackThread = createStackNavigator();

export function CreateThreadStack() {
  return (
    <StackThread.Navigator>
      <StackThread.Screen name='Create Thread' component={CreateThread} options={{ headerShown: false }} />
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
      <StackThread.Screen name='Thread List' component={ThreadList} options={{ headerShown: false }} />
      <StackThread.Screen name='Thread Detail' component={ThreadDetail} options={{ headerShown: false }} />
    </StackThread.Navigator>
  )
}


export function DrawerNavigators() {
  const currentUserData = useSelector(state => state.currentUserData);
  return (
    <Drawer.Navigator
      initialRouteName="Thread List"
      drawerStyle={{ backgroundColor: '#0A2239' }}
      drawerContentOptions={{ inactiveTintColor: '#FFFFFF', activeTintColor: lib.primary, activeBackgroundColor: '#1D84B5' }}
      drawerContent={(props) => CustomDrawer(props, currentUserData)}
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
              <Stack.Screen name='Register Form' component={RegisterForm} options={{ headerShown: false }} />
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