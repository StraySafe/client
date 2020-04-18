import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Home'
import ThreadList from './src/components/ThreadList'
import CreateThread from './src/components/CreateThread'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
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

const Stack = createStackNavigator()

function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Adopt" component={Adopt} />
            <Stack.Screen name="Add Pet" component={AddPet} />
            <Stack.Screen name="My Cats" component={MyCats} />
            <Stack.Screen name="Adopt Detail" component={AdoptDetail} />
            <Stack.Screen name="Owner Contact" component={OwnerContact} />
            <Stack.Screen name='Thread List' component={ThreadList} />
            <Stack.Screen name='Thread Detail' component={ThreadDetail} />
            <Stack.Screen name='Create Thread' component={CreateThread} />
            <Stack.Screen name='Home' component={Home} />
          </Stack.Navigator>
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