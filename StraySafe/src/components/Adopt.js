import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, ImageBackground } from 'react-native';
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
  const token = useSelector(state => state.access_token);

  const adoptablePets = pets.filter(cat => cat.request_user_id == null);

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
          {adoptablePets.length !== 0
            ? adoptablePets.map(pet =>
              <TouchableOpacity key={pet.id} style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }} onPress={() => navigation.navigate('Adopt Detail', { petId: pet.id, origin: 'fromAdopt', pet })}>
                <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
                <View style={{ justifyContent: 'center', paddingLeft: 15, paddingRight: 50 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5 }}>{pet.name}</Text>
                  <Text style={{ fontSize: 12, color: lib.accent, marginBottom: 5 }}>{`${pet.species} | ${moment(pet.birth_date).fromNow(true)}`}</Text>
                  <Text style={{ fontSize: 12, marginBottom: 5 }}>{pet.description}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: lib.accent, marginBottom: 5 }}><FontAwesome5 name="user-circle" solid /> {`${pet.User.first_name} ${pet.User.last_name}`}</Text>
                </View>
              </TouchableOpacity>
            )
            :
            <View style={{ justifyContent: 'center', paddingLeft: 15, paddingRight: 50 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5, textAlign: "center" }}>Sorry, there are no adoptable pets right now</Text>
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    </>
  )
}