import React, {useState, useEffect} from 'react';
import { Text, Input, Button, List, Card, Toggle } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import Comment from './Comment';
import { createComment, fetchOneThread, reqStatusUp } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, PermissionsAndroid, SafeAreaView, StatusBar, Image, ProgressBarAndroid, AsyncStorage } from 'react-native';
import AppHeader from './AppHeader';
import MapView, { Marker } from 'react-native-maps';
import CustomMapStyle from './MapStyle';
import lib from './ColorLib';

export default function ThreadDetail (props) {
    const [ comment, setComment ] = useState('')
    const { navigation } = props
    const { thread } = props.route.params
    const [ checked, setChecked ] = useState(false);
    const token = useSelector(state => state.access_token)
    const threadFetched = useSelector(state => state.thread)
    const isLoading = useSelector(state => state.isLoading)
    const currentUser = useSelector(state => state.currentUserData)

    const dispatch = useDispatch()

    // console.log('data fetched dengan include', threadFetched, 'Data fetched')

    const handleOnPress = (e, thread) => {
        (_retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('token');
              if (value !== null) {
                // We have data!!
                console.log(value, 'tokennyaaaa nihhhhh');
              }
            } catch (error) {
              // Error retrieving data
            }
          })()
        
        const payload = {
            message: comment,
            ThreadId: thread.id,
        }

        dispatch(createComment(payload, token))
        // dispatch(fetchOneThread(thread.id))
        if(checked) {
            dispatch(reqStatusUp(thread.id))
            setChecked(false)
        }
        setComment('')
    }

    const dateFormat = new Date(threadFetched.createdAt).toLocaleDateString()

    const Header = (props) => (
        <View {...props}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.userPhotoContainer}>
                    <View style={styles.userPhoto}>
                        <Image source={{ uri: thread.User.img_url }} style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 80 / 2 }} />
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', marginLeft: 5}}>
                    <Text category='h6'>{threadFetched.title.toUpperCase()}</Text>
                    <Text category='s2'>{dateFormat} by {threadFetched.User.first_name}</Text>
                    <Text category='c1' status={threadFetched.status == '1' ? 'danger' : 'success'}>
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



    if(isLoading) return (
        <View style={{flex: 1, justifyContent: "center", padding: 10}}>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={true} progress={0.5}/>
        </View>
    )

    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
                    <SafeAreaView style={{ backgroundColor: lib.white , flex: 1}}>
                        <StatusBar
                            backgroundColor={lib.primary}
                            barStyle='light-content'
                        />
                        <AppHeader title='Create New Thread' navigation={navigation} />
            <ScrollView >
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
                    onPress={(e) => handleOnPress(e, threadFetched, navigation)}
                >
                    Comment
                </Button>
            </ScrollView>
            </SafeAreaView>
        </React.Fragment>
        
    );
}

const styles = StyleSheet.create({
    card: {
      flex: 1,
      margin: 2,
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