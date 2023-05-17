import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../constants'
import { StaticImageService } from '../services'



const FlagItem = ({ code, name, dial_code, onPress }) => {
    return (
        // to select the country
        <TouchableOpacity style={styles.container} onPress={() => onPress({ code, name, dial_code })}>
            {/* upto here */}
            <Image style={styles.flagImage} source={{ uri: StaticImageService.getFlagIcon(code) }} />
            <Text style={styles.flagText}>{dial_code}</Text>
            <Text style={styles.flagText}>{name}</Text>
        </TouchableOpacity>
    )
}

export default FlagItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    flagImage: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    flagText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginRight: 10
    }
})