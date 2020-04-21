import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import { Button, Icon, List, ListItem, Divider } from '@ui-kitten/components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets } from '../store/actions';
import { useNavigation } from '@react-navigation/native';
import lib from './ColorLib';
import AppHeader from './AppHeader';
import moment from 'moment';

export default function MyCats() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets);
    const currentUserData = useSelector((state) => state.currentUserData);
    const token = useSelector(state => state.access_token)

    const myCatsOnly = pets.filter(cat => cat.UserId == currentUserData.id);
    const myAdoptRequests = pets.filter(request => request.requestUserId == currentUserData.id)
    console.log('mycats => > > >', myCatsOnly);
    
    useEffect(() => {
        dispatch(fetchPets(token));
    }, [])

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
            <SafeAreaView style={{ backgroundColor: lib.white }}>
                <StatusBar
                    backgroundColor={lib.primary}
                    barStyle='light-content'
                />
                <AppHeader title='My Cats' navigation={navigation} />
                <ScrollView>
                    <View style={styles.bigDivider}>
                        <Text style={{ color: '#000000' }}>Your cats</Text>
                    </View>
                    {myCatsOnly.map(pet =>
                        <TouchableOpacity key={pet.id} style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }} onPress={() => navigation.navigate('Pet Detail', { petId: pet.id, origin: 'fromMyCats' })}>
                            <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
                            {console.log(pet, '< < < < < <')}
                            <View style={{ justifyContent: 'center', paddingLeft: 15, paddingRight: 50 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5 }}>{pet.name}</Text>
                                <Text style={{ fontSize: 12, color: lib.accent, marginBottom: 5 }}>{`${pet.species} | ${moment(pet.birth_date).fromNow(true)}`}</Text>
                                <Text style={{ fontSize: 12, marginBottom: 5 }}>{pet.description}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    <View style={styles.bigDivider}>
                        <Text style={{ color: '#000000' }}>Your adopt requests</Text>
                    </View>
                    <View>
                        {myAdoptRequests.map(pet =>
                            <TouchableOpacity key={pet.id} style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: lib.white, borderBottomWidth: .25, borderColor: 'lightgrey', flexDirection: 'row' }} onPress={() => navigation.navigate('Owner Contact', { userId: pet.Owner.Id })}>
                                <Image source={require('../../assets/catheadplaceholder.png')} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
                                {console.log(pet, '< < < < < <')}
                                <View style={{ justifyContent: 'center', paddingLeft: 15, paddingRight: 50 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5 }}>{pet.name}</Text>
                                    <Text style={{ fontSize: 12, marginBottom: 5 }}>{pet.Owner.first_name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    myCat: {
        backgroundColor: "#933563",
        height: 100
    },
    container: {
        // maxHeight: 192,
    },
    catPhoto: {
        height: 35,
        width: 35,
        borderRadius: 35 / 2,
        backgroundColor: "#233563",
        marginLeft: 5
    },
    bigDivider: {
        justifyContent: 'center',
        paddingLeft: 15,
        height: 50,
        backgroundColor: '#E6ECF0'
    }
})