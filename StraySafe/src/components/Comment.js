import React, { useEffect } from 'react';
import { Text, Card } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Comment ({ comment }) {

    return (
        <Card style={styles.commentStyle}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.userPhotoContainer}>
                    <View style={styles.userPhoto}>
                        <Image source={{ uri: comment.User.img_url }} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }} />
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', marginLeft: 10}}>
                    <Text category="p1">{comment.User.first_name}</Text>
                    <ScrollView>
                        <Text category="p2">{comment.message}</Text> 
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
        borderRadius: 10,
        shadowColor: 'blue'
    }
  });