import React, { useState, useEffect } from 'react'
import {
    Input,
    Text,
} from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler';
import { 
    Alert, 
    StyleSheet, 
    PermissionsAndroid, 
    View, 
    TouchableOpacity, 
    SafeAreaView, 
    StatusBar, 
    AsyncStorage } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux'
import { createThread } from '../store/actions'
import lib from './ColorLib';
import CustomMapStyle from './MapStyle';
import AppHeader from './AppHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Button from './Button'
import * as ImagePicker from 'expo-image-picker'

export default function CreateThread({ navigation }) {

    const [ location, setLocation ] = useState(null);
    const [ currentRegLatitude, setCurrentRegLatitude ] = useState(-5.001)
    const [ currentRegLongitude, setCurrentRegLongitude ] = useState(107.215)
    const [ errorMsg, setErrorMsg] = useState(null);
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ imgUrl, setImgUrl ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ image_Url, setImageUrl ] = useState('')
    const token = useSelector(state => state.access_token)

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
            let access_token = await AsyncStorage.getItem('token')
            console.log(token, 'access')
            console.log(access_token, 'dari asyncstorage')
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

    const handleOnSubmit = (navigation) => {
        const payload = {
            title: title,
            description: description,
            lat: currentRegLatitude.toString(),
            long: currentRegLongitude.toString(),
            img_url: image_Url
        }
        // console.log(payload, 'data to submit')
        dispatch(createThread(payload, token))
        setTitle('')
        setDescription('')
        navigation.navigate('Thread List')
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        // console.log(location)
    }

    const chooseImageOnPress = async () => {
        let result = await ImagePicker.launchCameraAsync({
            base64: true
        })

        if(!result.cancelled){
      
            let base64Img = `data:image/jpg;base64,${result.base64}`
      
            let apiUrl = 'https://api.cloudinary.com/v1_1/straysafe/image/upload';
            let data = {
                "file": base64Img,
                "upload_preset": "bareeeg8"
            }

            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                'content-type': 'application/json'
                },
                method: 'POST',
            }).then(async r => {
                let data = await r.json()
                console.log(data.secure_url)
                setImageUrl(data.secure_url)
                return data.secure_url
            }).catch(err=>console.log(err))
        }
    }


    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
            <SafeAreaView style={{ backgroundColor: lib.white, flex: 1, alignItems: "center" }}>
                <StatusBar
                    backgroundColor={lib.primary}
                    barStyle='light-content'
                />
                <AppHeader title='Create New Thread' navigation={navigation} />
                <ScrollView>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
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
                                <Input
                                    style={styles.titleStyle}
                                    value={image_Url}
                                    label='Image Url'
                                    placeholder="Condition's Image Url"
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
                        title="Snapshot" 
                        rounded
                        children={<Text style={{ color: '#FFF' }}>Take Snapshot!</Text>}
                        customStyle={{ backgroundColor: '#1D84B5', alignItems: 'center' }}
                        onPress={() => chooseImageOnPress()}/>

                        <Button 
                            title="Submit" 
                            style={styles.submitButtonStyle}
                            onPress={() => handleOnSubmit(navigation)}
                            rounded
                            children={<Text style={{ color: '#FFF' }}>Submit New Thread</Text>}
                            customStyle={{ backgroundColor: '#1D84B5', alignItems: 'center' }}

                        />
                        </View>
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </SafeAreaView>
            </>
    );
}

const styles = StyleSheet.create({

    mapStyle: {
        justifyContent: 'center',
        height: 300,
        marginBottom: 15,
    },
    locationUpdate: {
        position: 'absolute',
        padding: 10,
        marginLeft: 280,
        marginRight: 10,
        zIndex: 1,
        borderRadius: 10,
        elevation: 2,
        bottom: 180,
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
        backgroundColor: lib.white,
        flex: 1
    },
    descriptionStyle: {
        padding: 5,
        elevation: 5,
    },
    addressStyle: {
        marginBottom: 10,
        padding: 5,
        elevation: 5
    },
    submitButtonStyle: {
    },
    createThreadFormStyle: {
        backgroundColor: lib.primary,
        width: 385,
        padding: 15,
        borderRadius: 15,
        marginTop: 15
    }
})