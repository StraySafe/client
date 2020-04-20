import React, { useState, useEffect } from 'react'
import {
    Input,
    Text,
    Button,
} from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Image, PermissionsAndroid, View, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, StatusBar } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux'
import { createThread } from '../store/actions'
import lib from './ColorLib';
import CustomMapStyle from './MapStyle';
import AppHeader from './AppHeader';

export default function CreateThread({ navigation }) {

    const [location, setLocation] = useState(null);
    const [currentRegLatitude, setCurrentRegLatitude] = useState(-5.001)
    const [currentRegLongitude, setCurrentRegLongitude] = useState(107.215)
    const [errorMsg, setErrorMsg] = useState(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [popupText, setPopupText] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location denied')
            }

            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
            const { latitude, longitude } = location.coords
            setCurrentRegLatitude(latitude)
            setCurrentRegLongitude(longitude)
            setLocation(location)
        })();
    }, []);

    const handleOnDrag = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate
        setCurrentRegLatitude(latitude)
        setCurrentRegLongitude(longitude)
    }

    const handleOnPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate
        console.log(latitude, longitude, 'on pressed')
        Location.reverseGeocodeAsync({ latitude, longitude })
            .then((result) => {
                const { street, region, postalCode } = result[0]
                const addressConv = `${street}, ${region}, ${postalCode}`
                setAddress(addressConv)
            }).catch((err) => {
                console.log(err, 'error nich')
            });

    }

    const handleOnSubmit = () => {
        const payload = {
            id: '4' + Math.floor(Math.random() * 20),
            User: {
                id: 1,
                username: 'testing'
            }, //JANGAN LUPA HAPUS!
            comments: [                                    //INI JUGA!!
                {
                    id: '1' + Math.floor(Math.random() * 20),
                    User: {
                        id: '1',
                        username: 'Alucard'
                    },
                    message: 'comment lagi'
                },
                {
                    id: '13' + Math.floor(Math.random() * 20),
                    User: {
                        id: '1',
                        username: 'Valir'
                    },
                    message: 'comment lagi 3'
                }
            ],
            title: title,
            description: description,
            lat: currentRegLatitude,
            long: currentRegLongitude,
            status: 'unresolved'
        }
        console.log(payload, 'data to submit')
        dispatch(createThread(payload))
        setTitle('')
        setDescription('')
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        // console.log(location)
    }

    return (
        <>
        <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
        <SafeAreaView style={{ backgroundColor: lib.white }}>
            <StatusBar
                backgroundColor={lib.primary}
                barStyle='light-content'
            />

            <AppHeader title='Create Thread' navigation={navigation} />
            <KeyboardAvoidingView contentContainerStyle={styles.scrollView}>
                <View elevation={5} style={styles.createThreadFormStyle}>
                    <View>
                        <Input
                            style={styles.titleStyle}
                            value={title}
                            label='Thread Title'
                            onChangeText={text => setTitle(text)}
                            placeholder="thread title..."
                        />
                    </View>
                    <View>
                        <Input
                            style={[styles.descriptionStyle]}
                            multiline={true}
                            numberOfLines={5}
                            value={description}
                            label='Thread Description'
                            textAlignVertical="top"
                            placeholder="thread description..."
                            onChangeText={text => setDescription(text)}
                        />
                    </View>
                    <View>
                        <MapView
                            onMapReady={() => {
                                PermissionsAndroid.request(
                                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                                ).then(granted => {
                                });
                            }}
                            onRegionChange={(region) => {
                                // initialRegion={region}
                            }}
                            ref={(mapView) => { _mapView = mapView; }}
                            style={styles.mapStyle}
                            initialRegion={{
                                latitude: currentRegLatitude,
                                longitude: currentRegLongitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            loadingEnabled
                            loadingIndicatorColor="#666666"
                            loadingBackgroundColor="#eeeeee"
                            showsUserLocation={true}
                            followsUserLocation={true}
                            customMapStyle={CustomMapStyle}
                        >
                            <Marker
                                coordinate={{ latitude: currentRegLatitude, longitude: currentRegLongitude }}
                                draggable
                                title='Tap marker to use this location'
                                description={address}
                                onDragEnd={(e) => handleOnDrag(e)}
                                onPress={(e) => handleOnPress(e)}
                            >
                            </Marker>
                        </MapView>
                    </View>
                    <TouchableOpacity
                        style={styles.locationUpdate}
                        onPress={() => _mapView.animateToRegion({
                            latitude: currentRegLatitude,
                            longitude: currentRegLongitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }, 2000)}>

                        <Text>Target</Text>
                    </TouchableOpacity>
                    <Button
                        title="Submit"
                        style={styles.submitButtonStyle}
                        onPress={() => handleOnSubmit()}

                    > Submit </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({

    mapStyle: {
        width: window.innerWidth,
        justifyContent: 'center',
        height: 300,
        marginBottom: 15,
        borderColor: lib.primary,
    },
    locationUpdate: {
        position: 'absolute',
        padding: 10,
        marginLeft: 240,
        marginRight: 10,
        zIndex: 1,
        borderRadius: 10,
        elevation: 2,
        bottom: 100,
        backgroundColor: lib.light
    },
    titleStyle: {
        padding: 5,
        elevation: 5
    },
    scrollView: {
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lib.accent,
        flex: 1
    },
    descriptionStyle: {
        padding: 5,
        elevation: 5
    },
    addressStyle: {
        marginBottom: 10,
        padding: 5,
        elevation: 5
    },
    submitButtonStyle: {
        padding: 10,
        elevation: 5
    },
    createThreadFormStyle: {
        backgroundColor: lib.light,
        width: 350,
        padding: 15,
        borderRadius: 15
    }
})