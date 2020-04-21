import React, {useState, useEffect} from 'react'
import { Text, Input, Button, List, Card, Toggle } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import Comment from './Comment'
import { createComment, fetchOneThread, reqStatusUp } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, PermissionsAndroid, SafeAreaView, StatusBar } from 'react-native'
import AppHeader from './AppHeader';
import MapView, { Marker } from 'react-native-maps'
import CustomMapStyle from './MapStyle';
import lib from './ColorLib'

export default function ThreadDetail (props) {
    const [ comment, setComment ] = useState('')
    const { navigation } = props
    const { thread } = props.route.params
    const [ checked, setChecked ] = useState(false);
    const [ threadDetail, setThreadDetail ] = useState({...thread})
    const token = useSelector(state => state.access_token)
    const threadFetched = useSelector(state => state.thread)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOneThread(thread.id))
        setThreadDetail({...threadDetail, threadFetched})
    }, [])

    const handleOnPress = (e, thread) => {
        const payload = {
            message: comment,
            ThreadId: thread.id
        }
        dispatch(createComment(payload, token))
        if(checked) {
            dispatch(reqStatusUp(thread.id))
            setChecked(false)
        }
        setComment('')
    }

    const Header = (props) => (
        <View {...props}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.userPhotoContainer}>
                    <View style={styles.userPhoto}>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', marginLeft: 5}}>
                    <Text category='h6'>{threadDetail.title.toUpperCase()}</Text>
                    <Text category='s2'>{threadDetail.createdAt} by {threadDetail.User.first_name}</Text>
                    <Text category='c1' status={threadDetail.status == '1' ? 'warning' : 'success'}>
                    {
                        threadDetail.status == '1' ? 'unresolved' :
                        threadDetail.status == '2' ? 'requested' : 'solved'
                    }
                    </Text>
                </View>
            </View>
        </View>
    )

    const Footer = (props) => (
        <View {...props}>
            <Text>{threadDetail.description}</Text>
        </View>
    )

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };

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
                    status={threadDetail.status == 'unresolved' ? 'danger':'success'}
                
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
                                latitude: Number(threadDetail.lat),
                                longitude: Number(threadDetail.long),
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
                                coordinate={{latitude: Number(threadDetail.lat), longitude: Number(threadDetail.long)}}
                            />
                        </MapView>
                </Card>
                {
                    threadDetail.Comments.map((comment) => (
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
                    onPress={(e) => handleOnPress(e, threadDetail)}
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