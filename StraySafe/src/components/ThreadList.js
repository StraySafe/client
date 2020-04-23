import React, { useEffect } from 'react'
import Thread from './Thread'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThreads } from '../store/actions'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, YellowBox } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from '@ui-kitten/components'
import lib from './ColorLib';
import AppHeader from './AppHeader';
import compareValues from './sort'
import LoadingScreen from './LoadingScreen'

export default function ThreadList({ navigation }) {

    const dispatch = useDispatch()
    const threads = useSelector(state => state.threads)
    const isLoading = useSelector(state => state.isLoading)
    
    
    useEffect(() => {
        YellowBox.ignoreWarnings(['Warning: ...']);
        dispatch(fetchThreads())
    }, [])

    
    const sortedActivities = threads.slice(0).sort(compareValues('createdAt', 'desc'))
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
            <SafeAreaView style={{ backgroundColor: lib.white, flex: 1 }}>
                <AppHeader title='Thread List' navigation={navigation} />
                <StatusBar
                    backgroundColor={lib.primary}
                    barStyle='light-content'
                />
                { isLoading ? 
                    ( <ScrollView>
                        <LoadingScreen/>
                      </ScrollView> ) : (
                    threads[0] ? 
                    ( <ScrollView>
                    {sortedActivities.map((thread) => (
                        <Thread navigation={navigation} thread={thread} key={thread.id} />
                    ))}
                    </ScrollView> ) : 
                    <View style={{ justifyContent: 'center', padding: 15, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5, textAlign: "center" }}>Yeay, the cats are saved!</Text>
                        <Image source={require('../../assets/noadoption.png')} style={{ resizeMode: 'contain', width: '60%' }} />
                    </View>
                    )
                }
                
            </SafeAreaView>
        </>
    );
}
