import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { confirmPasswordReset, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const handleSendCode = async () => {
        await sendPasswordResetEmail(auth, email);
        setModalVisible(true);
    }

    const handleConfirmPassWord = async () => {
        await confirmPasswordReset(auth, code, password);
        setModalVisible(false);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <Text>Reset Your Password</Text>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => handleConfirmPassWord()}
            >
                <View style={styles.container}>
                    <View style={styles.modal}>
                    <Text>Type your code in your Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Your code'
                        inputMode='numeric'
                        onChangeText={text => setCode(text)}
                        value={code}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleConfirmPassWord}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>
            <TextInput
                placeholder='Your Email'
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                placeholder='New password'
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                    <Text>Reset password</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
        fontSize: 18,
    },
    modal: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})