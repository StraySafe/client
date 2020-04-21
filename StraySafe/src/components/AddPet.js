import React, { useState } from 'react';
import { Input, Text, Datepicker, Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Image, Alert, SafeAreaView, View, StatusBar } from 'react-native';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { addPet, fetchPets } from '../store/actions';
import { useNavigation } from '@react-navigation/native';
import lib from './ColorLib';
import AppHeader from './AppHeader';

export default function AddPet() {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [ageYear, setAgeYear] = useState('');
  const [ageMonth, setAgeMonth] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.access_token)

  function handleOnPress() {
    dispatch(addPet({
      name,
      species,
      description,
      ageYear,
      ageMonth,
      img_url: imgUrl
    }, token))
    setName('');
    setSpecies('');
    setDescription('');
    setAgeYear('');
    setAgeMonth('');
    setImgUrl('');
    dispatch(fetchPets(token));
    navigation.navigate('Adopt');
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
      <SafeAreaView style={{ backgroundColor: lib.white, flex: 1, alignItems: "center" }}>
        <StatusBar
          backgroundColor={lib.primary}
          barStyle='light-content'
        />

        <AppHeader title='Add Pet' navigation={navigation} />
        <View style={{
              padding: 15,
              backgroundColor: lib.primary,
              borderRadius: 15,
              width: 350,
              marginTop: 35
            }}>
          <Input
            placeholder="Your pet's name"
            label='Name'
            value={name}
            onChangeText={nextValue => setName(nextValue)}
            style={{ marginBottom: 10 }}
          />
          {ageMonth > 12 ? <Text style={{ marginBottom: 10, color: 'maroon' }}>oops, invalid month value</Text> : null}
          <Layout style={{ marginBottom: 10, flexDirection: 'row', backgroundColor: lib.primary }} level='1'>

            <Input
              style={{ marginRight: 10, width: 100, flex: 2 }}
              label="Year"
              value={ageYear}
              keyboardType='number-pad'
              maxLength={2}
              placeholder='0'
              onChangeText={nextValue => setAgeYear(nextValue)}
            />

            <Input
              style={{ marginHorizontal: 10, width: 100, flex: 2 }}
              label="Month"
              value={ageMonth}
              keyboardType='number-pad'
              maxLength={2}
              placeholder='8'
              onChangeText={nextValue => setAgeMonth(nextValue)}
            />

          </Layout>
          <Input
            placeholder="Your pet's species"
            label="species"
            value={species}
            onChangeText={nextValue => setSpecies(nextValue)}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Your pet's Image Url"
            label="Image Url"
            value={imgUrl}
            onChangeText={nextValue => setImgUrl(nextValue)}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Tell something about your cat and why others should adopt it."
            label="Description"
            multiline={true}
            value={description}
            onChangeText={nextValue => setDescription(nextValue)}
            style={{ marginBottom: 10 }}
          />
          <Button
            style={{ alignItems: 'center' }}
            onPress={handleOnPress}
            children={<Text style={{ color: '#FFF' }}>Add New Pet</Text>}
            rounded
            customStyle={{ backgroundColor: '#1D84B5', alignItems: 'center' }}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
