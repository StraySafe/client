import React, {useState, useEffect} from 'react'
import { Text, Input, Button, List, Card, Toggle } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import Comment from './Comment'
import { createComment, fetchOneThread } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, PermissionsAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import CustomMapStyle from './MapStyle';

export default function ThreadDetail (props) {
    const [ comment, setComment ] = useState('')
    const { thread } = props.route.params

    const [checked, setChecked] = useState(false);
    const token = useSelector(state => state.access_token)
    const threadFetched = useSelector(state => state.thread)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOneThread(thread.id))
    }, [])

    console.log(threadFetched, 'hasil fetch nich')

    const handleOnPress = (e, thread) => {
        const payload = {
            message: comment,
            ThreadId: thread.id
        }
        dispatch(createComment(payload, token))
        setComment('')
        setChecked(false)
    }

    const Header = (props) => (
        <View {...props}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.userPhotoContainer}>
                    <View style={styles.userPhoto}>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', marginLeft: 5}}>
                    <Text category='h6'>{threadFetched.title.toUpperCase()}</Text>
                    <Text category='s2'>{threadFetched.createdAt} by {threadFetched.User.first_name}</Text>
                    <Text category='c1' status={threadFetched.status == '1' ? 'warning' : 'success'}>
                    {
                        threadFetched.status == '1' ? 'unresolved' :
                        threadFetched.status == '2' ? 'requested' : 'solved'
                    }
                    </Text>
                </View>
            </View>
        </View>
    )

    const Footer = (props) => (
        <View {...props}>
            <Text>{threadFetched.description}</Text>
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
                status={threadFetched.status == 'unresolved' ? 'danger':'success'}
            
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
                            latitude: Number(threadFetched.lat),
                            longitude: Number(threadFetched.long),
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
                            coordinate={{latitude: Number(threadFetched.lat), longitude: Number(threadFetched.long)}}
                        />
                    </MapView>
            </Card>
            {
                threadFetched.Comments.map((comment) => (
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
                onPress={(e) => handleOnPress(e, threadFetched)}
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