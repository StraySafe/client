import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, SafeAreaView, Image } from 'react-native';
import lib from './ColorLib';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOneUser } from '../store/actions';

export default function CustomDrawer({ navigation }) {
    const user = useSelector((state) => state.oneUser);
    const dispatch = useDispatch();
    console.log(user, '< < < < <');

    // useEffect(() => {
    //     dispatch(fetchOneUser(2))
    // }, [dispatch])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: lib.primary }}>
            <ScrollView style={{ marginTop: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={{ padding: 15, flexDirection: 'row' }}>
                        <Image source={require('../../assets/userplaceholder.jpg')} style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 80 / 2 }} />
                        <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontSize: 20, color: lib.white, fontWeight: '500' }}>{user.first_name}</Text>
                            <Text style={{ fontSize: 14, color: lib.accent }}>City</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 15 }} onPress={() => navigation.navigate('My Cats')}>
                    <Text style={{ color: lib.white }}>My Cats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 15 }} onPress={() => navigation.navigate('Thread List')}>
                    <Text style={{ color: lib.white }}>Threads</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 15 }} onPress={() => navigation.navigate('Adopt')}>
                    <Text style={{ color: lib.white }}>Adopt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 15 }} onPress={() => navigation.navigate('Create Thread')}>
                    <Text style={{ color: lib.white }}>Create Thread</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 15 }} onPress={() => navigation.navigate('Add Pet')}>
                    <Text style={{ color: lib.white }}>Add Pet</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}