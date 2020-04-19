import React, {useState, useEffect} from 'react'
import { 
    Card,
    Text,
} from '@ui-kitten/components'
import { View, StyleSheet, PermissionsAndroid, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ThreadDetail from './ThreadDetail'
import * as Location from 'expo-location';
import { getPreciseDistance } from 'geolib';

export default function Thread ({ navigation, thread}) {
    const { lat, long } = thread


    const [location, setLocation] = useState(null);
    const [ convLocation, setConvLocation ] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [ locButton, setLocButton ] = useState(false)

    const [ distance, setDistance ] = useState(0.0)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location denied');
            }

            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            const { longitude, latitude } = location.coords
            // let convertLocation = await Location.reverseGeocodeAsync({longitude, latitude});
            setLocation(location); //contain latitude and longitude
            // setConvLocation(convertLocation) // contain address, street, postal, city name etc.
            setDistance(getPreciseDistance({latitude, longitude}, {latitude: Number(lat), longitude: Number(long)})) //distance 
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        console.log(distance/1000, 'km away')
    }

    const navToDetail = (thread, navigation) => {
        <ThreadDetail />
        navigation.navigate('Thread Detail', {
            thread
        })
    }

    const Header = (props) => (
        <TouchableOpacity {...props} onPress={() => navToDetail(thread, navigation)}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View>
                    <Text>Image</Text>
                </View>
                <View style={{flex:1, flexDirection: 'column', marginLeft: 10}}>
                    <Text category='h6'>{thread.title.toUpperCase()}</Text>
                    <Text category='s2'>created date by username</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    const Footer = (props) => (
        <View style={{marginHorizontal: 25}}>
            <Text category='s2'>target : {(distance / 1000)} km away</Text>
        </View>
    )


    return (
        <React.Fragment>
            <Card 
                style={styles.card}
                header={Header}
                footer={Footer}
                status={thread.status == 'unresolved' ? 'danger':'success'}
            >
                <MapView 
                    onMapReady={() => {
                        PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        ).then(granted => {
                            setLocButton(true)  
                        //   alert(granted) // just to ensure that permissions were granted
                        });

                    }}
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: Number(lat),
                        longitude: Number(long),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    loadingEnabled
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={locButton}
                >
                    <Marker 
                        coordinate={{latitude: Number(lat), longitude: Number(long)}}
                    >
                    </Marker>
                </MapView>
            </Card>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      flex: 1,
      margin: 2,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    footerControl: {
      marginHorizontal: 2,
    },
    mapStyle: {
        width: window.innerWidth,
        height: 100,
        justifyContent: 'center',
        flex: 1
    }
  });