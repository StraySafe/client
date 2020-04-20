import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUser } from '../store/actions';
import lib from './ColorLib';

export default function OwnerContact({ route }) {
  const dispatch = useDispatch();
  const { userId } = route.params;
  const oneUser = useSelector((state) => state.oneUser);

  useEffect(() => {
    dispatch(fetchOneUser(userId))
  }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
      <SafeAreaView style={{ backgroundColor: lib.white }}>
        {/* header */}
        <View style={{ height: 60, backgroundColor: lib.primary, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: lib.white, fontWeight: '700', fontSize: 16 }}>{route.name}</Text>
        </View>
        {/* header */}

        <View style={styles.defaultPage}>
          <Text category='h5' style={{ marginBottom: 15 }}>Your request is sent!</Text>
          <Text category='h6' style={{ marginBottom: 25, width: Dimensions.get('window').width * 0.75, textAlign: 'center' }}>Please reach the owner by email/phone number</Text>
          <View style={{ width: 75, height: 75, backgroundColor: '#0A2239', borderRadius: 75 / 2, marginBottom: 25 }}></View>
          <Text style={{ marginBottom: 15 }}>{`${oneUser.first_name} ${oneUser.last_name}`}</Text>
          <Text>{`${oneUser.email}`}</Text>
          <Text>{`${oneUser.phone_number}`}</Text>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  defaultPage: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
    backgroundColor: '#FFF'
  }
})