import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Images, Colors, Fonts } from '../constants'
import { Display } from '../utils'

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Welcome')
        }, 3000)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent />
            <Image source={Images.PLATE}
                resizeMode='contain' style={styles.image} />
            <Text style={styles.title}>FooDelivery</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.DEFAULT_GREEN
    },
    image: {
        height: Display.setHeight(20),
        width: Display.setWidth(30)
    },
    title: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 28,
        fontFamily: Fonts.POPPINS_LIGHT
    }
})