import React, {useState} from 'react'
import { Text, Input, Button, List, Card, Toggle } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import Comment from './Comment'
import { createComment } from '../store/actions'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, PermissionsAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import CustomMapStyle from './MapStyle';

export default function ThreadDetail (props) {
    const [ comment, setComment ] = useState('')
    const [ requestCheck, setRequestCheck ] = useState(false)
    const { thread } = props.route.params

    const [checked, setChecked] = useState(false);

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
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.userPhotoContainer}>
                    <View style={styles.userPhoto}>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', marginLeft: 5}}>
                    <Text category='h6'>{thread.title.toUpperCase()}</Text>
                    <Text category='s2'>{thread.createdAt} by {thread.User.username}</Text>
                    <Text category='c1' status={thread.status == 'unresolved' ? 'warning' : 'success'}>{thread.status}</Text>
                </View>
            </View>
        </View>
    )

    const Footer = (props) => (
        <View {...props}>
            <Text>{thread.description}</Text>
        </View>
    )

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };


    return (
        <ScrollView>
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
                        customMapStyle={CustomMapStyle}
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
            <View>
                <Input
                
                    placeholder='Write a comment...'
                    value={comment}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical='top'
                    onChangeText={e => setComment(e)}
                />
            </View>
            
            <Toggle 
                style={styles.toggleStyle}
                checked={checked} 
                onChange={onCheckedChange}
            >
                    {`Request Resolve`}
            </Toggle>

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
      borderRadius: 10
    },
    checkbox: {
      margin: 2,
    },
    mapStyle: {
        width: window.innerWidth,
        height: 200,
        justifyContent: 'center',
        flex: 1
    },
    userPhoto: {
      height: 80,
      width: 80,
      borderRadius: 80 / 2,
      backgroundColor: "#233563"
    },
    userPhotoContainer: {
      paddingHorizontal: 5,
      marginRight: 10
      // paddingTop: 2.5
    },
    toggleStyle: {
        marginBottom: 5
    },
    commentStyle: {
        padding:2,
        backgroundColor:'#fff',
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 1
        }
    }
  });