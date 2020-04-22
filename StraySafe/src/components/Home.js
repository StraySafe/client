import React, { useState, useEffect } from 'react'
import { Text, Button, Input } from '@ui-kitten/components'
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, AsyncStorage, StatusBar } from 'react-native'
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../store/actions'
import lib from './ColorLib'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Home({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const token = useSelector(state => state.access_token)

    const navToContent = (navigation) => {
        dispatch(loginUser({ email, password }))
        navigation.push('Content')
    }

    const navToRegisterForm = (navigation) => {
        navigation.navigate('Register Form')
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: lib.primary }} />
            <SafeAreaView style={{ backgroundColor: lib.white, flex: 1 }}>
                <StatusBar
                    backgroundColor={lib.primary}
                    barStyle='light-content'
                />
                <KeyboardAwareScrollView contentContainerStyle={styles.homeStyle}>
                    {/* <ScrollView contentContainerStyle={styles.homeStyle}> */}
                    <View elevation={9} style={styles.loginFormStyle}>
                        <Text category='h4' style={styles.titleStyle}>STRAYSAFE</Text>
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
                            onPress={() => navToContent(navigation)}
                        >
                            Login
                </Button>
                        <View style={styles.buttonLoginForm}>
                            <Text style={{ color: lib.white }}>Don't have an account? </Text>
                            <TouchableOpacity
                                style={styles.submitButtonStyle}
                                onPress={() => navToRegisterForm(navigation)}
                            >
                                <Text style={styles.signUpText}>Join us</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                    {/* </ScrollView> */}
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    homeStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lib.white

    },
    emailStyle: {
        marginVertical: 10,
        padding: 0,
        height: 50,
        width: 250,
        fontSize: 20,
        textAlign: "center"
    },
    passwordStyle: {
        marginVertical: 10,
        padding: 0,
        height: 50,
        width: 250,
        fontSize: 20,
        textAlign: "center"
    },
    submitButtonStyle: {
        marginVertical: 20
    },
    loginFormStyle: {
        backgroundColor: lib.primary,
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
    },
    titleStyle: {
        marginBottom: 45,
        marginTop: 25,
        color: lib.white
    }
})