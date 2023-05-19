import { StyleSheet, StatusBar, Image, TextInput, TouchableOpacity, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, Fonts, Images } from '../constants'
import { Separator } from '../components'
import { Display } from '../utils'

const VerificationScreen = ({ navigation,

    route: {
        params: { phoneNumber }
    }
}) => {

    // for only fill one number in input box
    const firstInput = useRef()
    const secondInput = useRef()
    const thirdInput = useRef()
    const fourthInput = useRef()

    // for cordinate OTP
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' })


    return (
        <View View style={styles.container} >
            <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
            <Separator height={StatusBar.currentHeight} />

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.8}>
                    <Image source={Images.BACKICON} resizeMode='contain' style={{ width: 20 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>OTP Verification</Text>
            </View>

            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.content}>Enter the OTP pin just sent you at <Text style={styles.phoneNumberText}>{phoneNumber}</Text> </Text>
            <View style={styles.otpConatner}>
                <View style={styles.otpBox}>
                    <TextInput style={styles.otpText} keyboardType='number-pad'
                        maxLength={1}
                        // for only fill one number in input box
                        ref={firstInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 1: text })
                            text && secondInput.current.focus()
                        }}
                    />
                </View>
                <View style={styles.otpBox}>
                    <TextInput style={styles.otpText} keyboardType='number-pad'
                        maxLength={1}
                        ref={secondInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 2: text })
                            text ? thirdInput.current.focus() : firstInput.current.focus()
                        }} />
                </View>
                <View style={styles.otpBox}>
                    <TextInput style={styles.otpText} keyboardType='number-pad'
                        maxLength={1}
                        ref={thirdInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 3: text })
                            text ? fourthInput.current.focus() : secondInput.current.focus()
                        }} />
                </View>
                <View style={styles.otpBox}>
                    <TextInput style={styles.otpText} keyboardType='number-pad'
                        maxLength={1}
                        ref={fourthInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 4: text })
                            !text && thirdInput.current.focus()
                        }} />
                </View>
            </View>

            <TouchableOpacity style={styles.siginbtn}
                onPress={() => console.log(otp)}>
                <Text style={styles.siginbtnTest}>Verify</Text>
            </TouchableOpacity>

        </View >
    )
}

export default VerificationScreen

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
    phoneNumberText: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_REGULAR,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_YELLOW
    },
    otpConatner: {
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: "row",
    },
    otpBox: {
        borderRadius: 5,
        borderColor: Colors.LIGHT_GREEN,
        borderWidth: 0.5,
    },
    otpText: {
        fontSize: 25,
        color: Colors.DEFAULT_BLACK,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10
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