import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button, Icon, List, ListItem, Divider } from '@ui-kitten/components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets } from '../store/actions';
import { useNavigation } from '@react-navigation/native';

export default function MyCats() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets);

    const myCatsOnly = pets.filter(cat => cat.userId == '3');
    const myAdoptRequests = pets.filter(request => request.requestUserId == '3')

    useEffect(() => {
        dispatch(fetchPets());
    }, [])

    const renderItemIcon = (props) => (
        <View style={styles.catPhoto}></View>
    );

    const renderMyCats = ({ item, index }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { petId: item.id, origin: 'fromMyCats' })}>
            <ListItem
                title={<Text style={{ fontSize: 16 }}>{item.name}</Text>}
                description={`${item.description}`}
                accessoryLeft={renderItemIcon}
            />
        </TouchableOpacity>
    );

    const renderMyAdoptRequest = ({ item, index }) => (
        <ListItem
            title={<Text style={{ fontSize: 16 }}>{item.name}</Text>}
            description={`Owned by ${item.Owner.first_name}`}
            accessoryLeft={renderItemIcon}
            onPress={() => navigation.navigate('Owner Contact', { userId: item.Owner.Id })}
        />
    );

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.bigDivider}>
                        <Text style={{ color: '#000000' }}>Your cats</Text>
                    </View>
                    <View>
                        <List
                            style={styles.container}
                            data={myCatsOnly}
                            renderItem={renderMyCats}
                            ItemSeparatorComponent={Divider}
                        />
                    </View>
                    <View style={styles.bigDivider}>
                        <Text style={{ color: '#000000' }}>Your adopt requests</Text>
                    </View>
                    <View>
                        <List
                            style={styles.container}
                            data={myAdoptRequests}
                            renderItem={renderMyAdoptRequest}
                            ItemSeparatorComponent={Divider}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    myCat: {
        backgroundColor: "#933563",
        height: 100
    },
    container: {
        // maxHeight: 192,
    },
    catPhoto: {
        height: 35,
        width: 35,
        borderRadius: 35 / 2,
        backgroundColor: "#233563",
        marginLeft: 5
    },
    bigDivider: {
        justifyContent: 'center',
        paddingLeft: 15,
        height: 50,
        backgroundColor: '#E6ECF0'
    }
})