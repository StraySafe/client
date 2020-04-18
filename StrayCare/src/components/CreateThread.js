import React, { useState, useEffect } from 'react'
import {
    Input,
    Text,
    Button,
} from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Image, PermissionsAndroid, View, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux'
import { createThread } from '../store/actions'

export default function CreateThread () {

    const [location, setLocation] = useState(null);
    const [ currentRegLatitude, setCurrentRegLatitude ] = useState(-5.001)
    const [ currentRegLongitude, setCurrentRegLongitude ] = useState(107.215)
    const [errorMsg, setErrorMsg] = useState(null);
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if(status !== 'granted') {
                setErrorMsg('Permission to access location denied')
            }

            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
            const { latitude, longitude } = location.coords
            setCurrentRegLatitude(latitude)
            setCurrentRegLongitude(longitude)
            setLocation(location)
        })();
    }, []);
    
    // const handleOnDrag = (e) => {
    //     const { latitude, longitude } = e.nativeEvent.coordinate
    //     setCurrentLat(latitude)
    //     setCurrentLong(longitude)
    // }

    // const handleOnPress = (e) => {
    //     const { latitude, longitude } = e.nativeEvent.coordinate
    //     setCurrentLat(latitude)
    //     setCurrentLong(longitude)
    //     console.log(latitude, longitude, 'on pressed')
    // }

    const handleOnSubmit = () => {
        const payload = {
            id:'4'+Math.floor(Math.random() * 20),
            userId: '1234'+Math.floor(Math.random() * 20), //JANGAN LUPA HAPUS!
            comments: [                                    //INI JUGA!!
                {
                    id: '1'+Math.floor(Math.random() * 20),
                    description: 'comment lagi'
                },
                {
                    id: '13'+Math.floor(Math.random() * 20),
                    description: 'comment lagi 3'
                }
            ],
            title: title,
            description: description,
            latitude: currentRegLatitude,
            longitude: currentRegLongitude
        }
        console.log(payload, 'data to submit')
        dispatch(createThread(payload))
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        // console.log(location)
    }

    return (
        <ScrollView style={styles.scrollView}>
            <Input value={title} onChangeText={text => setTitle(text)}/>
            <Input 
                multiline={true}
                numberOfLines={5}
                value={description}
                style={{textAlignVertical: 'top'}}
                onChangeText={text => setDescription(text)}
            />
            <View>
                <MapView
                    onMapReady={() => {
                        PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        ).then(granted => {
                        });
                    }}
                    onRegionChangeComplete={(region) => {
                    }}
                    ref = {(mapView) => { _mapView = mapView; }}
                    style={styles.mapStyle} 
                    initialRegion={{
                        latitude:currentRegLatitude,
                        longitude:currentRegLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    loadingEnabled
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    <Marker 
                        coordinate={{latitude: currentRegLatitude, longitude: currentRegLongitude}} 
                        draggable
                        onDragEnd={(e) => handleOnDrag(e)}
                        onPress={(e) => handleOnPress(e)}
                    >
                </Marker> 
                </MapView>
                <TouchableOpacity 
                    onPress = {() => _mapView.animateToRegion({
                        latitude: currentRegLatitude,
                        longitude: currentRegLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }, 2000)}>
                    <Text>Update Your Location</Text>
                </TouchableOpacity>
            </View>
            <Button 
                title="Submit" 
                style={styles.submitButtonStyle}
                onPress={() => handleOnSubmit()}

            > Submit </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    mapStyle: {
        width: window.innerWidth,
        justifyContent: 'center',
        height: 300
    }
})