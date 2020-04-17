import React from 'react'
import { 
    Card,
    Text, 
    Button
} from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { ScrollView } from 'react-native-gesture-handler';

const Header = (props) => (
    <View>
        <Text category='h6'>Header</Text>
        <Text category='s1'>status</Text>
    </View>
)

const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]} >
        <Button
            style={styles.footerControl}
            size='small'
        >
        Accept
        </Button>
    </View>
)


export default function Thread ({ thread }) {
    console.log(thread)
    return (
        <React.Fragment>
            <Card style={styles.card} header={(thread) => Header(thread)} footer={Footer}>
                <Text>{thread.title}</Text>
                <MapView 
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker 
                        coordinate={{latitude: 37.78825, longitude: -122.4324}}
                    />    
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
        height: 100
    }
  });