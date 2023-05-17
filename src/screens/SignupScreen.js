import { StyleSheet, StatusBar, TextInput, Image, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Images } from '../constants'
import { Separator } from '../components'
import { Display } from '../utils'

const SignupScreen = ({ navigation }) => {

    const [isPasswordShow, setIsPasswordShow] = useState(false)


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

            <View style={styles.inputcontainer}>
                <View style={styles.inputSubcontainer}>
                    {/* <Feather name='user' size={22}/> */}
                    <Image source={Images.USERICON} style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                    />
                </View>
            </View>

            <Separator height={15} />

            <View style={styles.inputcontainer}>
                <View style={styles.inputSubcontainer}>
                    {/* <Feather name='user' size={22}/> */}
                    <Image source={Images.EMAIL} style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
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
                        style={styles.inputText} />
                    {/* <Feather /> */}
                    <TouchableOpacity onPress={() => setIsPasswordShow(!isPasswordShow)}>
                        {isPasswordShow ? <Image source={Images.EYEOFF} style={{ height: 25, width: 25, marginRight: 15 }} />
                            : <Image source={Images.EYEICON} style={{ height: 25, width: 25, marginRight: 15 }} />}
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.siginbtn}>
                <Text style={styles.siginbtnTest} onPress={() => navigation.navigate("RegisterPhone")}>Create Account</Text>
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
})