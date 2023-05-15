import { StyleSheet, View, StatusBar, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, Fonts, General, Images } from '../constants'
import { Separator, WelcomeCard } from '../components'
import { Display } from '../utils'


const Pagination = ({ index }) => {

    const pageStyle = isActive =>
        isActive ? styles.page : { ...styles.page, backgroundColor: Colors.DEFAULT_GREY }
    return (
        <View style={styles.pageContainer}>
            {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
                i === index ? (
                    <View style={pageStyle(true)} key={i} />
                ) : (
                    <View style={pageStyle(false)} key={i} />
                ),
            )}
        </View>
    )
}



const WelcomeScreen = ({ navigation }) => {
    // to get welcome list index
    const [welcomeListIndex, setWelcomeListIndex] = useState(0)
    const welcomeList = useRef();
    const onViewRef = useRef(({ changed }) => {
        setWelcomeListIndex(changed[0].index)
    })
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

    const pageScroll = () => {
        welcomeList.current.scrollToIndex({
            index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex
        })
    }

    // upto here
    return (
        <View style={styles.container}>
            <StatusBar translucent barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} />
            <Separator height={StatusBar.currentHeight} />
            <Separator height={Display.setHeight(8)} />

            <View style={styles.welcomeListContainer}>
                <FlatList
                    // to get welcome list index
                    ref={welcomeList}
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    // upto here

                    data={General.WELCOME_CONTENTS}
                    keyExtractor={item => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    overScrollMode='never'
                    renderItem={({ item }) => <WelcomeCard {...item} />}
                />
            </View>
            <Separator height={Display.setHeight(8)} />
            <Pagination index={welcomeListIndex} />
            <Separator height={Display.setHeight(8)} />
            {welcomeListIndex === 2 ? (

                <View style={styles.btnContainer}>
                    <TouchableOpacity activeOpacity={.8} style={styles.gettingstdbtn} onPress={() => navigation.navigate('Singin')}>
                        <Text style={styles.gettingstdbtnTxt}>GET STARTED</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={.8} style={{ marginLeft: 10 }} onPress={() => welcomeList.current.scrollToEnd()}>
                        <Text style={styles.buttonText}>SKIP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={() => pageScroll()}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.DEFAULT_WHITE
    },
    welcomeListContainer: {
        height: Display.setHeight(60),
    },
    pageContainer: {
        flexDirection: 'row',
    },
    page: {
        height: 8,
        width: 15,
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 32,
        marginHorizontal: 5
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: Display.setWidth(90),
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.POPPINS_BOLD,
        lineHeight: 16 * 1.4
    },
    button: {
        backgroundColor: Colors.LIGHT_GREEN,
        paddingVertical: 20,
        paddingHorizontal: 11,
        borderRadius: 32,
    },
    btnContainer: {
        paddingVertical: 12,
    },
    gettingstdbtn: {
        backgroundColor: Colors.LIGHT_GREEN,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: "center",
        elevation: 2

    },
    gettingstdbtnTxt: {
        fontSize: 20,
        color: Colors.DEFAULT_WHITE,
        lineHeight: 20 * 1.4
    }
})
