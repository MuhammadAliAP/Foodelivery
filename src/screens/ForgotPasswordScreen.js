import { StyleSheet, StatusBar, TextInput, Image, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, Images } from '../constants'
import { Display } from '../utils'
import { Separator } from '../components'

const ForgotPasswordScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.8}>
                    <Image source={Images.BACKICON} resizeMode='contain' style={{ width: 20 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Forgot Password</Text>
            </View>

            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.content}>Enter your username, so that we can help you to recover your password</Text>
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

            <TouchableOpacity style={styles.siginbtn}>
                <Text style={styles.siginbtnTest}>Reset Password</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ForgotPasswordScreen

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
        marginStart: Display.setHeight(10),
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
})