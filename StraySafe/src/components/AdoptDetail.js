import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOnePet, deletePet, fetchPets } from '../store/actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

export default function AdoptDetail({ route }) {
  console.log(route);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { petId, origin } = route.params;

  const onePet = useSelector((state) => state.onePet);

  useEffect(() => {
    dispatch(fetchOnePet(petId))
  }, [])
  
  function handleDelete() {
    dispatch(deletePet(petId));
    dispatch(fetchPets());
    navigation.goBack();
  }

  return (
    <ScrollView style={{ backgroundColor: '#FFF' }}>

      <View style={styles.details}>
        <Text style={styles.petName}>{onePet.name}</Text>
        <Text style={styles.petSpecies}>{`${onePet.species} | ${onePet.ageYear} Year ${onePet.ageMonth} Month`}</Text>
        <Text style={styles.petDesc}>{onePet.description}</Text>
        <Text style={styles.petOwner}>{`Owned by ${onePet.Owner} ${onePet.Owner}`}</Text>
      </View>
      {origin === 'fromAdopt'
        ?
        <Button
          style={{ alignItems: 'center' }}
          onPress={() => Alert.alert(
            'Adoption',
            'Are you sure you are ready to adopt this cat?',
            [
              {
                text: "Yes",
                onPress: () => navigation.navigate('Owner Contact', { userId: onePet.Owner.Id })
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "destructive"
              }
            ]
          )}
          children={<Text style={{ color: '#FFF' }}>Adopt</Text>}
          rounded
          customStyle={{ backgroundColor: '#1D84B5', alignItems: 'center', width: 150 }}
        />
        :
        <Button
          style={{ alignItems: 'center' }}
          onPress={() => Alert.alert(
            'Delete',
            'Are you sure you want to remove this pet?',
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel"),
                style: "cancel"
              },
              {
                text: "Delete",
                onPress: handleDelete,
                style: "destructive"
              }
            ]
          )}
          children={<Text style={{ color: '#FFF' }}>Delete</Text>}
          rounded
          customStyle={{ backgroundColor: 'maroon', alignItems: 'center', width: 150 }}
        />
      }


    </ScrollView>
  )
}

const accent = '#1D84B5'

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
    padding: 10
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
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200
  },
  textBtn: {
    backgroundColor: accent,
    padding: 20,
    color: '#fff',
    width: 100,
    textAlign: 'center',
  }

})