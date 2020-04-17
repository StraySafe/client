import React, {useState} from 'react'
import { Text, Input, Button } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import Comment from './Comment'


export default function ThreadDetail (props) {
    const [ comment, setComment ] = useState('')
    const { thread } = props.route.params
    console.log(thread)
    const handleOnPress = (e) => {
        console.log(thread)
    }

    return (
        <ScrollView>
            <Text>{thread.title}</Text>
            <Text>{thread.description}</Text>
            {
                thread.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))
            }
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