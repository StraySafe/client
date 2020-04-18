import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUser } from '../store/actions';

export default function OwnerContact({ route }) {
  const dispatch = useDispatch();
  const { userId } = route.params;
  const oneUser = useSelector((state) => state.oneUser);

  useEffect(() => {
    dispatch(fetchOneUser(userId))
  }, [])

  return (
    <>
    <View style={styles.defaultPage}>
      <Text>
        {userId}
      </Text>
      <Text>
        {JSON.stringify(oneUser)}
      </Text>
    </View>
    <View style={styles.test}>

    </View>
    </>
  )
}

const styles = StyleSheet.create({
  defaultPage: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1D84B5'
  },
  test: {
    flex: 1,
    backgroundColor: '#234063'
  }
})