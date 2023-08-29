import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, Images } from '../constants'
import { StaticImageService } from '../services'

const RestaurantCard = ({ id, name, images: { poster }, tags, distance, time }) => {
    
    
    
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Image style={styles.posterStyle} source={{ uri: StaticImageService.getPoster(poster) }} />
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.tagText}  numberOfLines={2} ellipsizeMode="tail">{tags?.join('•  ')}</Text>
            <View style={styles.footerConatiner } >
                <View style={styles.rowAndCenter}>
                    <Image source={Images.STAR}/>
                    <Text style={styles.ratingText}>4</Text>
                    <Text style={styles.reviewText}>({10})</Text>
                </View>
                <View style={styles.rowAndCenter }>
                    <View style={styles.timeAndDistanceContainer}>
                        <Image source={Images.YELLOWLOCATION}/>
                        <Text style={styles.timeAndDistanceText}>{distance}m</Text>
                    </View>
                    <View style={styles.timeAndDistanceContainer}>
                        <Image source={Images.TIME}/>
                        <Text style={styles.timeAndDistanceText}>{time}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 10,
    },
    posterStyle: {
        width: 1920 * 0.15,
        height: 1080 * 0.15,
        borderRadius: 10,
        margin: 5
    },
    titleText: {
        marginLeft: 8,
        fontSize: 15,
        lineHeight: 15 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK
    },
    tagText: {
        marginLeft: 8,
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_GREY,
        marginBottom: 5,
        width:300,
        height:30
    },
    footerConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 6,
        justifyContent: 'space-between',
      },
      rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      timeAndDistanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: Colors.LIGHT_YELLOW,
        borderRadius: 12,
        marginHorizontal: 3,
      },
      timeAndDistanceText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_YELLOW,
      },
      ratingText: {
        marginLeft: 5,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
      },
      reviewText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
      },
})