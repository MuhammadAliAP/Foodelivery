import { StyleSheet, Text, View, StatusBar, FlatList, Image } from 'react-native'
import React from 'react'
import { Colors, General, Images } from '../constants'
import { WelcomeCard } from '../components'

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar translucent barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} />
            <View style={styles.welcomeListContainer}>
                <FlatList data={General.WELCOME_CONTENTS}
                    keyExtractor={item => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    renderItem={({ item }) => <WelcomeCard {...item} />}
                />
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.DEFAULT_WHITE
    }
})