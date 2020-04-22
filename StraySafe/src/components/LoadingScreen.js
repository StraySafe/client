import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import lib from './ColorLib';

export default function LoadingScreen() {

  return (
    <React.Fragment>
        <View  style={styles.defaultPage}>
            <Image source={require('../../assets/loading.gif')}/>
            <Text>Pleas wait :3 ...</Text>
            {/* style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 80 / 2 }} */}
        </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  defaultPage: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
    backgroundColor: lib.white
  }
})