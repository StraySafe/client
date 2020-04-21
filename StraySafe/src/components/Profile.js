import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets, fetchOneUser } from '../store/actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import lib from './ColorLib';
import AppHeader from './AppHeader';
import compareValues from './sort';
import moment from 'moment';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const oneUser = useSelector((state) => state.oneUser);
  const userThreads = useSelector(state => state.user_threads)
  const currentUserData = useSelector(state => state.currentUserData);
  const myPets = pets.filter(cat => cat.UserId == currentUserData.id);

  const sortedPets = myPets.slice(0).sort(compareValues('updatedAt', 'desc'));
  const sortedThreads = userThreads.slice(0).sort(compareValues('updatedAt', 'desc'));

  useEffect(() => {
    dispatch(fetchOneUser(currentUserData.id))
    dispatch(fetchPets(currentUserData.token));
  }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
      <SafeAreaView style={{ backgroundColor: lib.white }}>
        <StatusBar
          backgroundColor={lib.primary}
          barStyle='light-content'
        />

        <AppHeader title='Profile' navigation={navigation} />
        <ScrollView>
          <StatusBar
            backgroundColor={lib.primary}
            barStyle='light-content'
          />
          <View style={{ padding: 15, height: 100, flexDirection: 'row' }}>
            <Image source={oneUser.img_url ? { uri: oneUser.img_url } : require('../../assets/userplaceholder.png')} style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 80 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15, flex: 1, height: 80 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>{`${oneUser.first_name}`}</Text>
              <Text style={{ fontSize: 12, color: lib.accent, marginBottom: 3 }}>{oneUser.email}</Text>
              <Text style={{ fontSize: 12, color: '#000000' }}>{oneUser.city}</Text>
            </View>
          </View>

          <View style={{ marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Your threads</Text>
          </View>
          {sortedThreads.length !== 0
            ?
            sortedThreads.map((thread) => (
              <TouchableOpacity key={thread.id} style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
                <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
                <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>{thread.title}</Text>
                  <Text style={{ fontSize: 12, color: lib.accent }}>{moment(thread.createdAt).format("ddd, hA")}</Text>
                </View>
              </TouchableOpacity>
            ))
            :
            <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.light }}>
              <Text style={{ fontSize: 14, fontWeight: '200', color: 'gray' }}>You don't have any thread</Text>
            </View>
          }

          {/* ============================= */}
          <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>My Pets</Text>
          </View>

          {sortedPets.length !== 0
            ?
            sortedPets.map(pet =>
              <TouchableOpacity key={pet.id} style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
                <Image source={pet.img_url ? { uri: pet.img_url } : require('../../assets/userplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
                <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>{pet.name}</Text>
                  <Text style={{ fontSize: 12, color: lib.accent, marginBottom: 5 }}>{`${pet.species} | ${moment(pet.birth_date).fromNow(true)}`}</Text>
                </View>
              </TouchableOpacity>
            )
            :
            <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.light }}>
              <Text style={{ fontSize: 14, fontWeight: '200', color: 'gray' }}>You don't own any pet</Text>
            </View>
          }
          <View style={{ paddingHorizontal: 15, height: 70, paddingVertical: 10, backgroundColor: '#EFF2EF' }}>
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}