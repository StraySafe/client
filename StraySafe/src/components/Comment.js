import React, { useEffect } from 'react';
import { Text, Card } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import lib from './ColorLib'

export default function Comment ({ comment }) {

    return (
        <Card style={styles.commentStyle}>
            <View style={{flex:1}}>
                <View style={{...styles.userPhotoContainer, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={{ uri: comment.User.img_url }} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
                        <View style={{marginLeft: 10}}>
                            <Text category="p2" style={{fontWeight: "bold", fontSize: 14}}>{comment.User.first_name}</Text>
                            <Text category='c2' style={{color: 'gray'}}>commented {moment(comment.createdAt).fromNow(true)} ago</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', alignItems: "flex-start", marginLeft: 20, marginTop: 20, justifyContent: "space-between"}}>
                    <ScrollView style={{borderRadius: 2}}>
                        <Text category="p1" style={{fontStyle: "normal"}}>{comment.message}</Text> 
                    </ScrollView>
                </View>
            </View>
        </Card>
    )
}


const styles = StyleSheet.create({
    userPhoto: {
      height: 50,
      width: 50,
      borderRadius: 50 / 2,
      backgroundColor: "#233563"
    },
    userPhotoContainer: {
      // paddingTop: 2.5
    },
    commentStyle: {
        padding: 0
    }
  });