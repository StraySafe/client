import React from 'react'
import { Text, Card } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'

export default function Comment ({ comment }) {
    return (
        <Card style={styles.commentStyle}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.userPhotoContainer}>
                    <View style={styles.userPhoto}>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column', marginLeft: 10}}>
                    <Text>{comment.User.username}</Text>
                    <Text>{comment.message}</Text> 
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