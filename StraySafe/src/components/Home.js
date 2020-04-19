import React from 'react'
import { Text, Button } from '@ui-kitten/components'


export default function Home ({ navigation }) {
    
    const navToThreadList = () => {
        navigation.push('Thread List')
    }
    
    return (
        <Button
          onPress={() => navToThreadList()}
        >
            Go to thread list
        </Button>
    );
}