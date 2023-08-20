import { StyleSheet, StatusBar, TextInput, Image, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Images } from '../constants'
import { LoadingScreen, Separator } from '../components'
import { Display } from '../utils'
import { AuthrnticationService } from '../services'




const SignupScreen = ({ navigation }) => {
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [userameErrorMessage, setuserameErrorMessage] = useState('')
    const [emailErrorMessage, setemailErrorMessage] = useState('')
    const [emailState, setemailState] = useState('default')
    const [usernameState, setusernameState] = useState('default')


    const inputStyle = (state) => {
        switch (state) {
            case 'valid':
                return { ...styles.inputcontainer, borderWidth: 1, borderColor: Colors.SECONDARY_GREEN }
            case 'invalid':
                return { ...styles.inputcontainer, borderWidth: 1, borderColor: Colors.DEFAULT_RED }

            default:
                return styles.inputcontainer
        }
    }
    const showMarker = (state) => {
        switch (state) {
            case 'valid':
                return (<Image source={Images.TICKMARK} />)
            case 'invalid':
                return (<Image source={Images.XMARK} />)

            default:
                return null
        }
    }


    const register = () => {
        let user = {
            username,
            email,
            password
        }
        console.log(user);
        setisLoading(true)
        AuthrnticationService.register(user).then(response => {
            setisLoading(false)
            console.log(response);
            if (!response?.status) {
                setErrorMessage(response?.message)
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000)
            }
        })
        // navigation.navigate("RegisterPhone")
    }

    const checkUserExist = async = (type, value) => {
        if (value?.length > 0) {
            AuthrnticationService.checkUserExist(type, value)
                .then(response => {
                    if (response?.status) {
                        type === 'email' && emailErrorMessage ? setemailErrorMessage('') : null
                        type === 'username' && userameErrorMessage ? setuserameErrorMessage('') : null

                        type === 'email' ? setemailState('valid') : null
                        type === 'username' ? setusernameState('valid') : null

                    } else {
                        type === 'email' ? setemailErrorMessage(response.message) : null
                        type === 'username' ? setuserameErrorMessage(response.message) : null


                        type === 'email' ? setemailState('invalid') : null
                        type === 'username' ? setusernameState('invalid') : null

                    }
                })
        }
    }



    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.8}>
                    <Image source={Images.BACKICON} resizeMode='contain' style={{ width: 20 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sign In</Text>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.content}>Enter your email, choose a username and password</Text>

            <View style={inputStyle(usernameState)}>
                <View style={styles.inputSubcontainer}>
                    {/* <Feather name='user' size={22}/> */}
                    <Image source={Images.USERICON} style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setUsername(text)}
                        onEndEditing={({ nativeEvent: { text } }) => checkUserExist('username', text)}
                    />
                    {showMarker(usernameState)}
                </View>
            </View>

            <Text style={styles.errMsg}>{userameErrorMessage}</Text>

            <View style={inputStyle(emailState)}>
                <View style={styles.inputSubcontainer}>
                    {/* <Feather name='user' size={22}/> */}
                    <Image source={Images.EMAIL} style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setEmail(text)}
                        onEndEditing={({ nativeEvent: { text } }) => checkUserExist('email', text)}

                    />
                    {showMarker(emailState)}

                </View>
            </View>
            <Text style={styles.errMsg}>{emailErrorMessage}</Text>


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
            <TouchableOpacity style={styles.siginbtn} onPress={() => register()}>
                {isLoading ? <LoadingScreen /> : <Text style={styles.siginbtnTest}>Create Account</Text>}

            </TouchableOpacity>

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

export default SignupScreen

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
    }, siginbtnText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.POPPINS_MEDIUM,
        // marginLeft:5,
        alignSelf: 'center',
        marginTop: 20
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
    errMsg: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: Colors.DEFAULT_RED,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: 20,
        marginTop: 5
    },
})