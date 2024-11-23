/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState([1, 2, 3]);

  const handleLocation = loc => {
    console.log('location: ', loc);
  };

  return (
    <View className="flex-1 relatives">
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <Image
        className="absolute w-full h-full"
        blurRadius={70}
        source={require('../../assets/images/bg.png')}
      />
      <SafeAreaView className="flex flex-1">
        {/* Search Section */}
        <View className="mx-4 relative z-50 h-15 mt-4">
          <View
            className=" flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch
                ? 'rgba(255, 255, 255, 0.2)'
                : 'transparent',
            }}>
            {showSearch ? (
              <TextInput
                placeholder="Search City"
                placeholderTextColor={'lightgray'}
                className="pl-6 h-10 flex-1 text-base text-white"
              />
            ) : null}

            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
              className="rounded-full p-3 m-1">
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
          {location.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {location.map((loc, index) => {
                let showBorder = index + 1 !== location.length;
                let borderClass = showBorder
                  ? 'border-b-2 border-b-gray-400'
                  : '';
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      'flex-row item-center border-0 p-3 px-4 mb-1 ' +
                      borderClass
                    }>
                    <MapPinIcon size="20" color="black" />
                    <Text className="text-black text-lg ml-2">
                      London, United Kingdom
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* Forecast Section */}
        <View className="mx-4 flex justify-around flex-1">
          <Text className="text-white font-bold text-2xl text-center">
            London,
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdom
            </Text>
          </Text>
          {/* Weather Image */}
          <View className="flex-row justify-center">
            <Image
              className="w-52 h-52"
              source={require('../../assets/images/partlycloudy.png')}
            />
          </View>
          {/* Degree Celcius */}
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              23&#176;
            </Text>
            <Text className="text-center  text-white text-xl tracking-widest ">
              Partly Cloudy
            </Text>
          </View>
          {/* Other Stats */}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row gap-x-2 items-center">
              <Image
                className="h-6 w-6"
                source={require('../../assets/icons/wind.png')}
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row gap-x-2 items-center">
              <Image
                className="h-6 w-6"
                source={require('../../assets/icons/drop.png')}
              />
              <Text className="text-white font-semibold text-base">23%</Text>
            </View>
            <View className="flex-row gap-x-2 items-center">
              <Image
                className="h-6 w-6"
                source={require('../../assets/icons/sun.png')}
              />
              <Text className="text-white font-semibold text-base">
                6.05 AM
              </Text>
            </View>
          </View>
        </View>
        {/* Forecast For Next Day */}
        <View className="mb-12 gap-y-3">
          <View className="flex-row gap-x-2 items-center mx-5">
            <CalendarDaysIcon size={22} color="white" />
            <Text className="text-white text-base">Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 15}}
            showsHorizontalScrollIndicator={false}>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 gap-y-1 mr-4"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
              <Image
                className="h-11 w-11"
                source={require('../../assets/images/heavyrain.png')}
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 gap-y-1 mr-4"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
              <Image
                className="h-11 w-11"
                source={require('../../assets/images/heavyrain.png')}
              />
              <Text className="text-white">Tuesday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 gap-y-1 mr-4"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
              <Image
                className="h-11 w-11"
                source={require('../../assets/images/heavyrain.png')}
              />
              <Text className="text-white">Wednesday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 gap-y-1 mr-4"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
              <Image
                className="h-11 w-11"
                source={require('../../assets/images/heavyrain.png')}
              />
              <Text className="text-white">Thursday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 gap-y-1 mr-4"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
              <Image
                className="h-11 w-11"
                source={require('../../assets/images/heavyrain.png')}
              />
              <Text className="text-white">Friday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 gap-y-1 mr-4"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
              <Image
                className="h-11 w-11"
                source={require('../../assets/images/heavyrain.png')}
              />
              <Text className="text-white">Saturday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 gap-y-1 mr-4"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
              <Image
                className="h-11 w-11"
                source={require('../../assets/images/heavyrain.png')}
              />
              <Text className="text-white">Sunday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
