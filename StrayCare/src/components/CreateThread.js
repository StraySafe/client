import React, { useState } from 'react'
import {
    Input,
    Text,
    Button,
} from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

export default function CreateThread () {

    const [currentLat, setCurrentLat] = useState(0.0)
    const [currentLong, setCurrentLong] = useState(0.0)

    const handleOnDrag = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate
        setCurrentLat(latitude)
        setCurrentLong(longitude)
        // console.log(latitude, longitude)
    }

    const handleOnPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate
        setCurrentLat(latitude)
        setCurrentLong(longitude)
        console.log('pressed', latitude, longitude)

    }

    return (
        <ScrollView style={styles.scrollView}>
            <Input />
            <Input />
            <MapView
                style={styles.mapStyle} 
                showsMyLocationButton={true}
            >
                <Marker 
                    coordinate={{latitude: -6.26593, longitude: 106.8107}} //masih hard code
                    draggable
                    onDragEnd={(e) => handleOnDrag(e)}
                    onPress={(e) => handleOnPress(e)}
                >
                </Marker> 
            </MapView>
            <Text>Lat: {currentLat} | Long: {currentLong}</Text>
            <Button title="Submit" style={styles.submitButtonStyle}></Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    mapStyle: {
        width: window.innerWidth,
        height: 300
    }
})