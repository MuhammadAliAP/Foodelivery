import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Separator } from '../components'

import { Colors } from '../constants';


const SigninScreen = () => {
  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        {/* <Ionicons name="chevron-back-outline" size={30} /> */}
        <Text>Sign In</Text>
      </View>
      {/* <Icon name={'ios-person-outline'} /> */}
      <Text>WELCOME</Text>
      <Text>Enter your username and password,and enjoy ordering food</Text>
      <View>
        <View>
          {/* <Feather /> */}
          <TextInput />
        </View>
      </View>
      <Separator />
      <View>
        <View>
          {/* <Feather /> */}
          <TextInput />
          {/* <Feather /> */}
        </View>
      </View>
      <Text></Text>

      <View>
        <View>
          <Text>remember me</Text>
        </View>
        <Text>Forgot password</Text>
      </View>

      <TouchableOpacity>
        <Text>Sign In</Text>
      </TouchableOpacity>

      <View>
        <Text>Don't have an account?</Text>
        <Text>Sign Up</Text>
      </View>
      <Text>OR</Text>

      <TouchableOpacity>
        <View>
          <View>
            <Image />
          </View>
          <Text>Connect with Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <View>
            <Image />
          </View>
          <Text>Connect with Google</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default SigninScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  }




})