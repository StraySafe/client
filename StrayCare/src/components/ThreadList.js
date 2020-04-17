import React, { useEffect } from 'react'
import Thread from './Thread'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThreads } from '../store/actions'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function ThreadList () {

    const dispatch = useDispatch()
    const threads = useSelector(state => state.threads)

    useEffect(() => {
        dispatch(fetchThreads())
    }, [])

    return (
        <ScrollView>
            {threads.map((thread) => (
                <Thread thread={thread} key={thread.Id}/>
            ))}
        </ScrollView>
    );
}