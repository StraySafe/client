import React, { useEffect } from 'react'
import Thread from './Thread'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThreads } from '../store/actions'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from '@ui-kitten/components'


export default function ThreadList ({ navigation }) {

    const dispatch = useDispatch()
    const threads = useSelector(state => state.threads)

    useEffect(() => {
        dispatch(fetchThreads())
    }, [])

    return (
        <ScrollView>
            {threads.map((thread) => (
                <Thread navigation={navigation} thread={thread} key={thread.id}/>
            ))}
        </ScrollView>
    );
}
