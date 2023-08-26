import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Images } from '../constants'
import { CategoryMenuItem, Separator } from '../components'
import Mock from '../constants/Mock'

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState()


  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle='light-content' backgroundColor={Colors.DEFAULT_GREEN} translucent />
      <Separator height={StatusBar.currentHeight} /> */}
      <View style={styles.backgroundcurvedContainer} />
      <View style={styles.headerConatiner}>
        <View style={styles.locationConatiner}>
          <Image source={Images.LOCATION} />
          <Text style={styles.locationText}>Delivered to</Text>
          <Text style={styles.selectedLocationText}>HOME</Text>
          <Image source={Images.WHITEARROEDOWN} />
          <Image source={Images.BELL} style={{ position: 'absolute', right: 0, height: 28 }} />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Image source={Images.SEARCH} />
            <Text style={styles.searchText}>Search..</Text>
          </View>
          <Image source={Images.SLIDER} style={{ marginRight: 10 }} />
        </View>
        <View style={styles.catagoriesContainer}>
          {Mock.CATEGORIES.map(({ name, logo }) => (
            <CategoryMenuItem name={name} logo={logo} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          ))}
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE
  }, backgroundcurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1
  },
  headerConatiner: {
    justifyContent: "space-evenly"
  },
  locationConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM
  },
  selectedLocationText: {
    color: Colors.DEFAULT_YELLOW,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    position: 'absolute',
    right: 0,
    top: -2
  },
  alertBadgeText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  searchText: {
    color: Colors.DEFAULT_GREY,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 10
  },
  catagoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop:20,

  }
})