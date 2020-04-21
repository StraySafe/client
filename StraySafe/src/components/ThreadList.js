import React, { useEffect } from 'react'
import Thread from './Thread'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThreads } from '../store/actions'
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from '@ui-kitten/components'
import lib from './ColorLib';
import AppHeader from './AppHeader';

export default function ThreadList({ navigation }) {

    const dispatch = useDispatch()
    const threads = useSelector(state => state.threads)

    useEffect(() => {
        dispatch(fetchThreads())
    }, [])

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
            <SafeAreaView style={{ backgroundColor: lib.white, flex: 1 }}>
                <AppHeader title='Thread List' navigation={navigation} />
                <StatusBar
                    backgroundColor={lib.primary}
                    barStyle='light-content'
                />
                <ScrollView>
                    {threads.map((thread) => (
                        <Thread navigation={navigation} thread={thread} key={thread.id} />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
