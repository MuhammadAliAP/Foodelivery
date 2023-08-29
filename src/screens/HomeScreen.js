import { FlatList, TouchableOpacity, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, Images } from '../constants'
import { CategoryMenuItem, RestauranrMediumCard, RestaurantCard, Separator } from '../components'
import Mock from '../constants/Mock'
import { RestaurantService } from '../services'
import { Display } from '../utils'

const sortStyle = isActive => isActive ? styles.sortListItem : { ...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE }

const HomeScreen = (navigation) => {
  const [activeCategory, setActiveCategory] = useState()
  const [restaurant, setrestaurant] = useState(null)
  const [activeSortItem, setActiveSortItem] = useState('recent')

  useEffect(() => {

    RestaurantService.getRestaurant().then(response => {
      console.log(response.data);
      if (response?.status) {
        setrestaurant(response?.data)
      }
    })
    // const unsubscribe = navigation.addListener('focus', () => {


    // })
    // return unsubscribe;
  }, [])


  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={Colors.DEFAULT_GREEN} translucent />
      <Separator height={StatusBar.currentHeight} />
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
            <CategoryMenuItem name={name} logo={logo} key={name} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          ))}
        </View>
      </View>
      <ScrollView style={styles.listContainer}>
        <View style={styles.horizontalListContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>Top Rated</Text>
            <Text style={styles.listHeaderSubTitle}>See All</Text>
          </View>

          <FlatList
            data={restaurant}
            keyExtractor={(item) => item?.id}
            horizontal
            ListHeaderComponent={() => <Separator width={20} />}
            ListFooterComponent={() => <Separator width={20} />}
            ItemSeparatorComponent={() => <Separator width={10} />}
            renderItem={({ item }) => (
              <RestaurantCard {...item} />
            )}
          />
        </View>

        <View style={styles.sortListContainer}>
          <TouchableOpacity style={sortStyle(activeSortItem === 'recent')} activeOpacity={0.8}
            onPress={() => setActiveSortItem('recent')}>
            <Text style={styles.sortListItemText}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={sortStyle(activeSortItem === 'favorite')} activeOpacity={0.8}
            onPress={() => setActiveSortItem('favorite')}>
            <Text style={styles.sortListItemText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={sortStyle(activeSortItem === 'rating')} activeOpacity={0.8}
            onPress={() => setActiveSortItem('rating')}>
            <Text style={styles.sortListItemText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={sortStyle(activeSortItem === 'popular')} activeOpacity={0.8}
            onPress={() => setActiveSortItem('popular')}>
            <Text style={styles.sortListItemText}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={sortStyle(activeSortItem === 'trending')} activeOpacity={0.8}
            onPress={() => setActiveSortItem('trending')}>
            <Text style={styles.sortListItemText}>Trending</Text>
          </TouchableOpacity>

        </View>
        {restaurant?.map(item => <RestauranrMediumCard {...item} key={item?.id} />
        )}

        <Separator height={Display.setHeight(5)}/>
      </ScrollView>
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
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 30
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5
  },
  listHeaderTitle: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM
  },
  listHeaderSubTitle: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM
  }, sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEFAULT_YELLOW,
    height: 40,
  },
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
})