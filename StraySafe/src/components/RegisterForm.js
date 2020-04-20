import React, { useState } from 'react'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { Button } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { registerUser } from '../store/actions'
import { View, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { Input } from '@ui-kitten/components'
import lib from './ColorLib'

export default function RegisterForm({ navigation }) {

    const dispatch = useDispatch()

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ emailAddress, setEmailAddress ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState('')

    const handleOnSubmit = () => {
        Alert.alert(
            "Confirmation",
            "By confirming this action, you are accept to follow our rules?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "Confirm", onPress: () => {
                    dispatch(registerUser({
                        first_name: firstName,
                        last_name: lastName,
                        email: emailAddress,
                        password: password,
                        bio: description,
                        phone_number: phoneNumber,
                        city: 'jakarta',
                        img_url: ''
                    }))
                    setFirstName('')
                    setLastName('')
                    setEmailAddress('')
                    setPassword('')
                    setDescription('')
                    setPhoneNumber('')
                }
              }
            ]
          );
       
    }

    return (
        <KeyboardAvoidingView style={styles.formStyle} behavior="height">
            <View elevation={5} style={styles.registerFormStyle}>
                <Input
                    style={styles.inputStyle}
                    label="First Name" 
                    placeholder="first name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <Input
                    style={styles.inputStyle} 
                    label="Last Name" 
                    placeholder="last name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                <Input
                    style={styles.inputStyle} 
                    label="Phone Number" 
                    placeholder="phone number (e.g. 0826xxxx)"
                    value={phoneNumber}
                    keyboardType='phone-pad'
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <Input 
                    style={styles.inputStyle}
                    label="Email Address" 
                    placeholder="email address (e.g. john@mail.com)"
                    value={emailAddress}
                    onChangeText={(text) => setEmailAddress(text)}
                />
                <Input 
                    style={styles.inputStyle}
                    label="Password" 
                    placeholder="password" secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    style={[styles.inputStyle, {height: 120}]}
                    label="Your Description" 
                    placeholder="your description...(e.g. 'i am a cat lover')"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical='top'    
                />
                <Button
                    onPress={() => handleOnSubmit(navigation)}
                >
                    SIGN UP
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    formStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        marginVertical: 10,
        padding: 0,
        height: 50,
        width: 300,
        fontSize: 20,
        textAlign: "center"
    },
    registerFormStyle:{
        backgroundColor: lib.light,
        width: 350,
        padding: 20,
        borderRadius: 10
    }
})