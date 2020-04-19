import React, {useState} from 'react'
import { Text, Input, Button, List, Card } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import Comment from './Comment'
import { createComment } from '../store/actions'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, PermissionsAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function ThreadDetail (props) {
    const [ comment, setComment ] = useState('')
    const { thread } = props.route.params

    const dispatch = useDispatch()

    const handleOnPress = (e) => {
        const payload = {
            id: '12'+Math.floor(Math.random()*18),
            message: comment,
            UserId: '1',
            ThreadId: '2'
        }
        dispatch(createComment(payload))
    }

    const Header = (props) => (
        <View {...props}>
            <Text category='h6'>{thread.title}</Text>
            <Text category='s1'>{thread.status}</Text>
        </View>
    )

    const Footer = (props) => (
        <View {...props}>
            <Text category='s2'>date</Text>
        </View>
    )


    return (
        <ScrollView>
            <Card 
                style={styles.card} 
                header={Header} 
                footer={Footer}
                status={thread.status == 'unresolved' ? 'danger':'success'}
            
            >
                <Text>{thread.description}</Text>
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
                            latitude: Number(thread.lat),
                            longitude: Number(thread.long),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        loadingEnabled
                        loadingIndicatorColor="#666666"
                        loadingBackgroundColor="#eeeeee"
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                    >
                        <Marker 
                            coordinate={{latitude: Number(thread.lat), longitude: Number(thread.long)}}
                        />
                    </MapView>
            </Card>
            {
                thread.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))
            }
            <Input
                placeholder='Write a comment...'
                value={comment}
                multiline={true}
                numberOfLines={5}
                textAlignVertical='top'
                onChangeText={e => setComment(e)}
            />
            <Button
                onPress={(e) => handleOnPress(e)}
            >
                Comment
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
      flex: 1,
      margin: 2,
    },
    mapStyle: {
        width: window.innerWidth,
        height: 200,
        justifyContent: 'center',
        flex: 1
    }
  });