import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets } from '../store/actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';
import lib from './ColorLib';
import { FontAwesome5 } from '@expo/vector-icons';
import AppHeader from './AppHeader';
import moment from 'moment';

export default function Adopt() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const token = useSelector(state => state.access_token)

  useEffect(() => {
    dispatch(fetchPets(token));
  }, [])
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
      <SafeAreaView style={{ backgroundColor: lib.white }}>
        <StatusBar
          backgroundColor={lib.primary}
          barStyle='light-content'
        />

        <AppHeader title='Adopt' navigation={navigation} />
        <ScrollView>

          {pets.map(pet =>
            <TouchableOpacity key={pet.id} style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }} onPress={() => navigation.navigate('Adopt Detail', { petId: pet.id, origin: 'fromAdopt', pet })}>
              <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
              <View style={{ justifyContent: 'center', paddingLeft: 15, paddingRight: 50 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5 }}>{pet.name}</Text>
                <Text style={{ fontSize: 12, color: lib.accent, marginBottom: 5 }}>{`${pet.species} | ${moment(pet.birth_date).fromNow(true)}`}</Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>{pet.description}</Text>
                <Text style={{ fontSize: 12, fontWeight: '600', color: lib.accent, marginBottom: 5 }}><FontAwesome5 name="user-circle" solid /> {`${pet.User.first_name} ${pet.User.last_name}`}</Text>
              </View>
            </TouchableOpacity>
          )}
          <Button
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('Add Pet')}
            children={<Text style={{ color: '#FFF' }}>Add New Pet</Text>}
            rounded
            customStyle={{ backgroundColor: '#1D84B5', alignItems: 'center' }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  )
}