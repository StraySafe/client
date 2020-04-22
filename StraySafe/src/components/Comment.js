import React, { useEffect } from 'react';
import { Text, Card } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import lib from './ColorLib'

export default function Comment ({ comment }) {

    return (
        <Card style={styles.commentStyle}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.userPhotoContainer}>
                    <View style={styles.userPhoto}>
                        <Image source={{ uri: comment.User.img_url }} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', alignItems: "flex-start", marginLeft: 10, justifyContent: "space-between"}}>
                    <View style={{borderBottomWidth: 0.4, marginBottom: 15}}>
                        <Text category="p2" style={{fontWeight: "bold"}}>{comment.User.first_name}</Text>
                        <Text category='c2'>commented {moment(comment.createdAt).fromNow(true)} ago</Text>
                    </View>
                    <ScrollView style={{backgroundColor: lib.light, borderRadius: 2}}>
                        <Text category="p1" style={{fontStyle: "normal"}}>"{comment.message}"</Text> 
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