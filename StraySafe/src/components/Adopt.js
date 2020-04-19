import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Platform, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets } from '../store/actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';
import Constants from 'expo-constants';
import lib from './ColorLib';

export default function Adopt() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [])
  return (
    <>
      <ScrollView>
        {pets.map(pet =>
          <TouchableOpacity key={pet.id} style={styles.petCard} onPress={() => navigation.navigate('Adopt Detail', { petId: pet.id, origin: 'fromAdopt' })}>
            <View style={styles.catPhotoContainer}>
              <View style={styles.catPhoto}>
              </View>
            </View>
            <View style={styles.details}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petSpecies}>{`${pet.species} | ${pet.ageYear} Year ${pet.ageMonth} Month`}</Text>
              <Text style={styles.petDesc}>{pet.description}</Text>
              <Text style={styles.petOwner}>{`Owned by ${pet.Owner}`}</Text>
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
    </>
  )
}

const primary = '#0A2239';
const accent = '#1D84B5';
const white = '#FFF';
const light = '#E6ECF0';

const styles = StyleSheet.create({
  petCard: {
    minHeight: 125,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: .25,
    borderBottomColor: 'grey'
  },
  catPhoto: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: lib.primary
  },
  catPhotoContainer: {
    paddingHorizontal: 10,
    // paddingTop: 2.5
  },
  details: {
    paddingRight: 50
  },
  petName: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 7
  },
  petSpecies: {
    fontWeight: '100',
    color: accent,
    marginBottom: 7
  },
  petDesc: {
    fontWeight: '100',
    marginBottom: 7,
    // fontSize: 20
  },
  petOwner: {
    fontWeight: '100',
    color: accent,
    // marginBottom: 10
  }
})