import React, {useState} from 'react'
import { Text, Input, Button } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';


export default function ThreadDetail () {

    const [ comment, setComment ] = useState('')

    const handleOnPress = (e) => {
        console.log('test')
    }

    return (
        <ScrollView>
            <Text>Thread Detail</Text>
            <Input
                placeholder='Write a comment...'
                value={comment}
                onChangeText={e => setComment(e)}
            />
            <Button
                onPress={(e) => handleOnPress(e)}
            >
                Comment
            </Button>
        </ScrollView>
    );
}