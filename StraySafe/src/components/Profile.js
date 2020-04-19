import React, { useEffect, Profiler } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOnePet, deletePet, fetchPets, fetchOneUser } from '../store/actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const dispatch = useDispatch();
  const oneUser = useSelector((state) => state.oneUser);

  useEffect(() => {
    dispatch(fetchOneUser(3))
  }, [])

  return (
    <>
      <Text>Profile here</Text>
      <Text>{JSON.stringify(oneUser)}</Text>
    </>
  )
}