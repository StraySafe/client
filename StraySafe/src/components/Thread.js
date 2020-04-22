import React, {useState, useEffect} from 'react'
import { 
    Card,
    Text,
} from '@ui-kitten/components'
import { View, StyleSheet, PermissionsAndroid, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { getPreciseDistance } from 'geolib';
import lib from './ColorLib'
import CustomMapStyle from './MapStyle';
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneThread } from '../store/actions' 
import moment from 'moment';

export default function Thread ({ navigation, thread}) {
    const { lat, long } = thread

    const dispatch = useDispatch()

    const date = moment(thread.createdAt).format("ddd, hA")

    const [location, setLocation] = useState(null);
    const isLoading = useSelector(state => state.isLoading)
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
        // console.log(distance/1000, 'km away')
        // console.log(thread)
    }

    function wait(timeout) {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const navToDetail = (thread, navigation) => {
        dispatch(fetchOneThread(thread.id))
            navigation.navigate('Thread Detail', {
                thread
            })
    }


    const Header = (props) => (
        <TouchableOpacity {...props} onPress={() => navToDetail(thread, navigation)}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.userPhotoContainer}>
                    <View style={styles.userPhoto}>
                        <Image source={thread.User.img_url ? { uri: thread.User.img_url } : require('../../assets/userplaceholder.png')} style={{ resizeMode: 'cover', width: 70, height: 70, borderRadius: 70 / 2 }} />
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', marginLeft: 5}}>
                    <Text category='p1'>{thread.title.toUpperCase()}</Text>
                    <Text category='s2' style={{fontWeight: "bold"}}>{date} by {thread.User.first_name}</Text>
                    <Text category='s2'>{(distance / 1000).toFixed(2)} km away</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    const Footer = (props) => (
        <View {...props} style={{
                flexDirection: "row", 
                alignItems: "flex-end", 
                justifyContent: "space-between",
                marginHorizontal: 25,
                padding: 5,
            }}
        >
            <Text
                style={{textTransform: "uppercase"}}
                category='c2' 
                status={thread.status == '1' ? 'danger' : 'success'}
            >
            {
                thread.status == '1' ? 'unresolved' :
                thread.status == '2' ? 'requested' : 'solved'
            } </Text>
            <Text category='c2'>{thread.Comments.length} Comments</Text>
        </View>
    )


    return (
        <React.Fragment>
            <Card 
                style={styles.card}
                header={Header}
                footer={Footer}
            >
                <MapView 
                    onMapReady={() => {
                        PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        ).then(granted => {
                            // setLocButton(true)  
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
                    customMapStyle={CustomMapStyle}
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
      margin: 5,
      borderRadius: 10,
      backgroundColor: lib.white,
      elevation: 9
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
        flex: 1,
        paddingHorizontal: 0

    },
    userPhoto: {
      height: 70,
      width: 70,
      borderRadius: 70 / 2,
      backgroundColor: "#233563"
    },
    userPhotoContainer: {
      paddingHorizontal: 5,
      // paddingTop: 2.5
    },
  });