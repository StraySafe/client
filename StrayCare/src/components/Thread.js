import React from 'react'
import { 
    Card,
    Text, 
    Button
} from '@ui-kitten/components'
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { ScrollView } from 'react-native-gesture-handler';
import ThreadDetail from './ThreadDetail'


const Header = ({thread}) => {
    return (
        <View>
            <Text category='h6'>{thread.title}</Text>
            <Text category='s1'>{thread.status}</Text>
        </View>
    )
}

const Footer = ({thread, navigation}) => {
    
    const handleAccept = (thread, navigation) => {
        <ThreadDetail />
        navigation.navigate('Thread Detail', {
            thread
        })
    }

    return (
        <View style={styles.footerContainer} >
            <Button
                style={styles.footerControl}
                size='small'
                onPress={() => handleAccept(thread, navigation)}
            >
                Show
            </Button>
        </View>
    )

}

export default function Thread ({ navigation, thread}) {
    const { lat, long } = thread
    return (
        <React.Fragment>
            <Card style={styles.card}>
                <Header thread={thread} />
                <View>
                    <MapView 
                        onMapReady={() => {
                            PermissionsAndroid.request(
                              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                            ).then(granted => {
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
                    >
                        <Marker 
                            coordinate={{latitude: Number(lat), longitude: Number(long)}}
                        />
                    </MapView>
                    <Text>{thread.description}</Text>
                </View>
                <Footer thread={thread} navigation={navigation} />
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
        height: 200,
        justifyContent: 'center',
        flex: 1
    }
  });