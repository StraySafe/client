import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button, Icon, List, ListItem, Divider } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets } from '../store/actions';

export default function MyCats() {
    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets);

    const myCatsOnly = pets.filter(cat => cat.userId === '2');
    const myAdoptRequests = pets.filter(request => request.requestUserId === '2')

    useEffect(() => {
        dispatch(fetchPets());
    }, [])

    const renderItemIcon = (props) => (
        <View style={styles.catPhoto}></View>
    );

    const renderMyCats = ({ item, index }) => (
        <ListItem
            title={`${item.name}`}
            description={`${item.description}`}
            accessoryLeft={renderItemIcon}
        />
    );

    const renderMyAdoptRequest = ({ item, index }) => (
        <ListItem
            title={`${item.name}`}
            description={`Owned by ${item.Owner.first_name}`}
            accessoryLeft={renderItemIcon}
        />
    );

    return (
        <>
        <SafeAreaView>
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
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        backgroundColor: "#233563"
    },
    bigDivider: {
        justifyContent: 'center',
        paddingLeft: 15,
        height: 50,
        backgroundColor: '#E6ECF0'
    }
})