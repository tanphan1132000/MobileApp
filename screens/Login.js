import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);
    const navigator = useNavigation();

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigator.replace("Home");
            }
        })
        return unsubcribe;
    }, [])

    const checkEmptyInput = (input) => {
        if (input === '') return true;
        return false;
    }

    const handleSignUp = () => {
        Keyboard.dismiss();
        if (!checkEmptyInput(email))
            createUserWithEmailAndPassword(auth, email, password)
                .catch(error => alert(error.code));
        else alert("Please type your Email and password");
    };

    const handleSignIn = () => {
        Keyboard.dismiss();
        if (!checkEmptyInput(password))
            signInWithEmailAndPassword(auth, email, password)
                .catch(error => alert(error.code));
        else alert("Please type your password");
    }

    const handleResetPassword = async () => {
        Keyboard.dismiss();
        if(!checkEmptyInput(email)) await sendPasswordResetEmail(auth, email);
        else alert("Please type your Email");
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                />

                <View style={styles.inputPasswordWrapper}>
                    <TextInput
                        placeholder='Password'
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry={secure}
                    />
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        <Feather style={styles.icon} name={secure ? "eye" : "eye-off"} size={24} color="black" />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                    <Text style={styles.text}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.text}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text>Forget password?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        fontSize: 18,
    },
    inputPasswordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        borderColor: '#0782F9',
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 5,
    },
    text: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    icon: {
        right: '130%',
    }
})