import React, { useState } from 'react'
import { Text, Button, Input } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../store/actions'
import lib from './ColorLib'


export default function Home ({ navigation }) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const dispatch = useDispatch()
    
    const navToThreadList = () => {
        console.log(email, password)
        dispatch(loginUser({email, password}))
    }

    const navToRegisterForm = (navigation) => {
        console.log('pindah ke register form')
        navigation.push('Register Form')
    }
    
    return (
        <View style={styles.homeStyle}>
            <View elevation={5} style={styles.loginFormStyle}>
                <Text category='h4'>STRAYSAFE</Text>
                <Input
                    value={email}
                    label="Email Address"
                    style={styles.emailStyle} 
                    placeholder="email"
                    keyboardType='email-address'
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    value={password}
                    label="Password" 
                    style={styles.passwordStyle}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}    
                />
                <Button
                    style={styles.submitButtonStyle}
                    onPress={() => navToThreadList()}
                >
                    Login
                </Button>
                <View style={styles.buttonLoginForm}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                        style={styles.submitButtonStyle}
                        onPress={() => navToRegisterForm(navigation)}
                    >
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    homeStyle:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        
    },
    emailStyle:{
        marginVertical: 10,
        padding: 0,
        height: 50,
        width: 200,
        fontSize: 20,
        textAlign: "center"
    },
    passwordStyle:{
        marginVertical: 10,
        padding: 0,
        height: 50,
        width: 200,
        fontSize: 20,
        textAlign: "center"
    },
    submitButtonStyle:{
        marginVertical: 20
    },
    loginFormStyle: {
        backgroundColor: lib.light,
        width: 300,
        alignItems: "center",
        borderRadius: 15

    },
    buttonLoginForm: {
        flexDirection: "row",
        alignItems: "center"
    },
    signUpText: {
        color: lib.accent
    }
})