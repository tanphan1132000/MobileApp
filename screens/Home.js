import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'

const Home = () => {
  const navigator = useNavigation();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Sign Out');
      navigator.replace("Login");
    })
    .catch(error => alert(error.code))
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#0782F9',
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 15,
  },
  text: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  }
})