import { StyleSheet, FlatList, StatusBar, TextInput, Image, TouchableOpacity, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, CountyCode, Fonts, Images } from '../constants'
import { FlagItem, Separator } from '../components'
import { Display } from '../utils'
import { StaticImageService } from '../services'


const getDropDownStyle = (y) => ({ ...styles.counteryDropdown, top: y + 60 })

const RegisterPhoneScreen = ({ navigation }) => {
    // to pass phone number into verification screen

    const [phoneNumber, setphoneNumber] = useState("")

    const [selectedCountry, setselectedCountry] = useState(
        CountyCode.find(country => country.name === 'India'))

    {/* to get containers live position */ }
    const [inputcontainerY, setinputcontainerY] = useState(0)
    {/* upto here */ }

    const [dropDownLayout, setdropDownLayout] = useState({})

    const [isDropdownOpen, setisDropdownOpen] = useState(false)
    // coustum made drop down close system   --- from here
    const closeDropdown = (pageX, pageY) => {
        if (isDropdownOpen) {
            if (
                pageX < dropDownLayout?.x ||
                pageX > dropDownLayout?.x + dropDownLayout?.width ||
                pageY < dropDownLayout?.y ||
                pageY > dropDownLayout?.y + dropDownLayout?.height
            ) {
                setisDropdownOpen(false);
            }
        }
    };

    return (
        <View style={styles.container} onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) => closeDropdown(pageX, pageY)}>
            {/* coustum made drop down close system --- upto here */}
            <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
            <Separator height={StatusBar.currentHeight} />

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.8}>
                    <Image source={Images.BACKICON} resizeMode='contain' style={{ width: 20 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Register Phone</Text>
            </View>

            <Text style={styles.title}>Register Phone</Text>
            <Text style={styles.content}>Enter your registered phone number to login</Text>

            {/* to get containers live position =onlayout=*/}
            <View style={styles.inputContainer} onLayout={({
                nativeEvent: {
                    layout: { y }
                } }) => setinputcontainerY(y)}>
                {/* upto here */}

                <TouchableOpacity style={styles.countryListContainer} onPress={() => setisDropdownOpen(!isDropdownOpen)}>
                    <Image style={styles.flagIcon} source={{ uri: StaticImageService.getFlagIcon(selectedCountry.code) }} />
                    <Text style={styles.countryCodenText}>{selectedCountry.dial_code}</Text>
                    <Image source={Images.ARROWDOWN} style={{ width: 19, height: 19 }} />{/* icon */}
                </TouchableOpacity>

                <View style={styles.phoneInputContainer}>
                    <TextInput
                        placeholder='Phone Number'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        keyboardType='number-pad'
                        style={styles.inputText}
                        //   coustum made drop down close system  
                        onFocus={() => setisDropdownOpen(false)}

                        onChangeText={(text) => setphoneNumber(selectedCountry?.dial_code + text)}
                    />
                </View>

            </View>
            {/* to get containers live position */}
            {isDropdownOpen && (
                < View style={getDropDownStyle(inputcontainerY)} onLayout={({
                    nativeEvent: {
                        layout: { x, y, height, width }
                    }
                }) => setdropDownLayout({ x, y, height, width })}>
                    <FlatList
                        data={CountyCode}
                        keyExtractor={(item) => item.code}
                        // to select the country
                        renderItem={({ item }) => <FlagItem {...item} onPress={(country) => {
                            setselectedCountry(country)
                            setisDropdownOpen(false)
                            // upto here
                        }} />}
                    />
                </View>
            )}

            <TouchableOpacity style={styles.siginbtn} activeOpacity={0.8} onPress={() => {
                navigation.navigate("Verification", { phoneNumber })
            }}>
                <Text style={styles.siginbtnTest} >Continue </Text>
            </TouchableOpacity>

        </View >
    )
}

export default RegisterPhoneScreen

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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 50,
    },
    countryListContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        width: Display.setWidth(22),
        marginRight: 10,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        flexDirection: 'row'
    },
    phoneInputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
        flex: 1
    },
    flagIcon: {
        width: 20,
        height: 20
    },
    countryCodenText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK
    },
    counteryDropdown: {
        backgroundColor: Colors.LIGHT_GREY,
        position: 'absolute',
        width: Display.setWidth(80),
        height: Display.setHeight(50),
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        zIndex: 3
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