import React, { useState } from 'react';
import { Input, Text , Datepicker} from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Image, Alert } from 'react-native';
import Button from './Button';

export default function AddPet() {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [birth_date, setBirthDate] = useState(new Date());
  
  return (
    <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
      <Text>Name</Text>
      <Input
        placeholder="Your pet's name"
        value={name}
        onChangeText={nextValue => setName(nextValue)}
        style={{ marginBottom: 10 }}
      />
      <Text>Birth Date</Text>
      <Datepicker
        date={birth_date}
        onSelect={nextDate => setBirthDate(nextDate)}
        style={{ marginBottom: 10 }}
      />
      <Text>Species</Text>
      <Input
        placeholder="Your pet's species"
        value={species}
        onChangeText={nextValue => setSpecies(nextValue)}
        style={{ marginBottom: 10 }}
      />
      <Text>Description</Text>
      <Input
        placeholder="Tell something about your cat and why others should adopt it."
        multiline={true}
        value={description}
        onChangeText={nextValue => setDescription(nextValue)}
        style={{ marginBottom: 10 }}
      />
      <Button
        style={{ alignItems: 'center' }}
        onPress={() => Alert.alert(
          'Adoption',
          'Are you sure you are ready to adopt this cat?'
        )}
        children={<Text style={{ color: '#FFF' }}>Add New Pet</Text>}
        rounded
        customStyle={{ backgroundColor: '#1D84B5', alignItems: 'center' }}
      />
    </ScrollView>
  )
}
