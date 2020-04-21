import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, StatusBar, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUser } from '../store/actions';
import lib from './ColorLib';
import AppHeader from './AppHeader';

export default function OwnerContact({ route, navigation }) {
  const dispatch = useDispatch();
  const { userId } = route.params;
  const oneUser = useSelector((state) => state.oneUser);

  useEffect(() => {
    dispatch(fetchOneUser(userId))
  }, [])

  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
      <SafeAreaView style={{ backgroundColor: lib.white }}>
        <StatusBar
          backgroundColor={lib.primary}
          barStyle='light-content'
        />
        <AppHeader title='Owner Contact' navigation={navigation} />
        {console.log('>>>', oneUser, '<<<<')}

        <View style={styles.defaultPage}>
          <Text category='h5' style={{ marginBottom: 15 }}>Your request is sent!</Text>
          <Text category='h6' style={{ marginBottom: 25, width: Dimensions.get('window').width * 0.75, textAlign: 'center' }}>Please reach the owner by email/phone number</Text>
          <Image source={oneUser.img_url ? { uri: oneUser.img_url } : require('../../assets/userplaceholder.png')} style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 80 / 2, marginBottom: 25 }} />
          <Text style={{ marginBottom: 15 }}>{`${oneUser.first_name} ${oneUser.last_name}`}</Text>
          <Text>{`${oneUser.email}`}</Text>
          <Text>{`${oneUser.phone_number}`}</Text>
        </View>
      </SafeAreaView>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  defaultPage: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
    backgroundColor: lib.white
  }
})