import React from 'react';
import { View, Text } from 'react-native';
import lib from './ColorLib';
import { EvilIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AppHeader({ title, navigation }) {
    return (
        <View style={{ height: 60, backgroundColor: lib.primary, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', height: 50 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <EvilIcons name="navicon" size={32} color={lib.white} style={{ paddingLeft: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 4, alignItems: 'center' }}>
                <Text style={{ color: lib.white, fontWeight: '700', fontSize: 16 }}>{title}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    )
}