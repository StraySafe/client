import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets } from '../store/actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';

export default function Adopt() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [])
  return (
    <ScrollView>
      {pets.map(pet =>
        <TouchableOpacity key={pet.id} style={styles.petCard} onPress={() => navigation.navigate('Adopt Detail', { petId: pet.id })}>
          <View style={styles.catPhotoContainer}>
            <View style={styles.catPhoto}>
            </View>
          </View>
          <View style={styles.details}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petSpecies}>{`${pet.species} | ${pet.birth_date}`}</Text>
            <Text style={styles.petDesc}>{pet.description}</Text>
            <Text style={styles.petOwner}>{`Owned by ${pet.Owner.first_name}`}</Text>
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
  )
}

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
    backgroundColor: "#233563"
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
    color: '#216EB5',
    marginBottom: 7
  },
  petDesc: {
    fontWeight: '100',
    marginBottom: 7,
    // fontSize: 20
  },
  petOwner: {
    fontWeight: '100',
    color: '#216EB5',
    // marginBottom: 10
  }
})