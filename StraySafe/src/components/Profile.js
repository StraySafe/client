import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOneUser } from '../store/actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import lib from './ColorLib';
import AppHeader from './AppHeader';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const oneUser = useSelector((state) => state.oneUser);

  useEffect(() => {
    dispatch(fetchOneUser(2))
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
            <Image source={require('../../assets/userplaceholder.jpg')} style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 80 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>{`${oneUser.first_name} ${oneUser.last_name}`}</Text>
              <Text style={{ fontSize: 12, color: lib.accent }}>{oneUser.kota}</Text>
            </View>
          </View>

          <View style={{ marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Your threads</Text>
          </View>

          <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Thread 1</Text>
              <Text style={{ fontSize: 12, color: lib.accent }}>by You</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Thread 2</Text>
              <Text style={{ fontSize: 12, color: lib.accent }}>by You</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Thread 3</Text>
              <Text style={{ fontSize: 12, color: lib.accent }}>by You</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Thread 4</Text>
              <Text style={{ fontSize: 12, color: lib.accent }}>by You</Text>
            </View>
          </TouchableOpacity>

          {/* ============================= */}
          <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Threads you've requested to solve</Text>
          </View>

          <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Request 1</Text>
              <Text style={{ fontSize: 12, color: lib.accent }}>by You</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Request 2</Text>
              <Text style={{ fontSize: 12, color: lib.accent }}>by You</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Request 3</Text>
              <Text style={{ fontSize: 12, color: lib.accent }}>by You</Text>
            </View>
          </TouchableOpacity>


        </ScrollView>
      </SafeAreaView>
    </>
  )
}