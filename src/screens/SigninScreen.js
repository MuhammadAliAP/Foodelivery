import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Separator, ToggleButton, LoadingScreen } from '../components'
import { Colors, Fonts, Images } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Display } from '../utils';
import { AuthrnticationService, StorageService } from '../services';
import { GeneralAction } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const SigninScreen = ({ navigation }) => {

  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const dispatch = useDispatch()

  const signIn = async () => {
    setisLoading(true)
    let user = {
      username, password
    }
    AuthrnticationService.login(user).then(response => {
      setisLoading(false)
      console.log(response);
      if (response?.status) {
        StorageService.setToken(response?.data).then(() => {
          dispatch(GeneralAction.setToken(response?.data))
        })

      } else {
        setErrorMessage(response?.message)
        setTimeout(() => {
          setErrorMessage('');
        }, 5000)
      }

    })
  }

  const { isFirstTimeUse } = useSelector(state => state.generalState)

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        {/* <Ionicons name="chevron-back-outline" size={30} /> */}

        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.8}>
          <Image source={Images.BACKICON} resizeMode='contain' style={{ width: 20 }} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Sign In</Text>
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.content}>Enter your username and password,and enjoy ordering food</Text>

      <View style={styles.inputcontainer}>
        <View style={styles.inputSubcontainer}>
          {/* <Feather name='user' size={22}/> */}
          <Image source={Images.USERICON} style={{ marginRight: 10 }} />
          <TextInput
            placeholder='Username'
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
      </View>
      <Separator height={15} />
      <View style={styles.inputcontainer}>
        <View style={styles.inputSubcontainer}>
          <Image source={Images.LOCKICON} style={{ marginRight: 10 }} />
          <TextInput placeholder='Password'
            secureTextEntry={isPasswordShow ? false : true}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={(text) => setPassword(text)}

          />

          {/* <Feather /> */}
          <TouchableOpacity onPress={() => setIsPasswordShow(!isPasswordShow)}>
            {isPasswordShow ? <Image source={Images.EYEOFF} style={{ height: 25, width: 25, marginRight: 15 }} />
              : <Image source={Images.EYEICON} style={{ height: 25, width: 25, marginRight: 15 }} />}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.errMsg}>{errorMessage}</Text>

      <View style={styles.forgotPasswordContainer}>
        <View style={styles.toggleContainer}>
          <ToggleButton size={0.5} />
          <Text style={styles.reminebdMeText}>remember me</Text>
        </View>
        <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("ForgotPassword")}>Forgot password</Text>
      </View>

      <TouchableOpacity style={styles.siginbtn} onPress={() => signIn()} activeOpacity={0.8
      }>
        {isLoading ? <LoadingScreen /> : <Text style={styles.siginbtnTest}>Sign In</Text>}


      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
      </View>
      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.facebookBtn}>
        <View style={styles.fbgContainer}>
          <View style={styles.signinBtnLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.signinBtnLogo} />
          </View>
          <Text style={styles.fbgbtnText}>Connect with Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleBtn}>
        <View style={styles.fbgContainer}>
          <View style={styles.signinBtnLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.signinBtnLogo} />
          </View>
          <Text style={styles.fbgbtnText}>Connect with Google</Text>
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
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setHeight(80),
    marginStart: Display.setHeight(16),
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20
  },
  inputcontainer: {
    backgroundColor: Colors.LIGHT_GREY,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: .5,
    borderColor: Colors.LIGHT_GREY2
  },
  inputSubcontainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1
  },
  forgotPasswordContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  reminebdMeText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.LIGHT_GREY2,
    fontFamily: Fonts.POPPINS_MEDIUM
  },
  forgotPasswordText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.LIGHT_GREEN,
    fontFamily: Fonts.POPPINS_BOLD
  },
  siginbtn: {
    backgroundColor: Colors.LIGHT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  siginbtnTest: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM
  },
  signupContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  accountText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM
  },
  signupText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: Colors.DEFAULT_GREEN,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 5
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_GREEN,
    fontFamily: Fonts.POPPINS_MEDIUM,
    // marginLeft:5,
    alignSelf: 'center'
  },
  facebookBtn: {
    backgroundColor: Colors.FABEBOOK_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'

  },
  googleBtn: {
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signinBtnLogo: {
    width: 30,
    height: 30
  },
  signinBtnLogoContainer: {

    position: 'absolute',
    left: 25,
    padding: 2
  },
  fbgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  fbgbtnText: {
    fontSize: 13,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 13 * 1.4,
    color: Colors.DEFAULT_WHITE

  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }, errMsg: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 10
  },




})

