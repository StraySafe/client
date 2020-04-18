import React from 'react'
import { Text, Card } from '@ui-kitten/components'

export default function Comment ({ comment }) {
    return (
        <Card>
            <Text>{comment.message}</Text>
        </Card>
    )
}