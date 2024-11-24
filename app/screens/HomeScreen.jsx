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
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';
import debounce from 'lodash.debounce';
import {fetchLocations, fetchWeatherForecast} from '../../api/weather';
import {weatherImages} from '../../constants';
import * as Progress from 'react-native-progress';
import {getData, storeData} from '../../utils/asynceStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = loc => {
    // console.log('got loc: ', loc);
    setLocations([]);
    setShowSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
      // console.log('Forecast 7day: ', data);
    });
  };

  const handleSearch = value => {
    //Fectch  Location
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    try {
      const myCity = await getData('city');

      const cityName = myCity || 'Bangkok';

      const data = await fetchWeatherForecast({
        cityName,
        days: '7',
      });

      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const {current, location} = weather;

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
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
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
                  onChangeText={handleTextDebounce}
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
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((loc, index) => {
                  let showBorder = index + 1 !== locations.length;
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
                        {loc?.name}, {` ${loc?.country}`}
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
              {location?.name},
              <Text className="text-lg font-semibold text-gray-300">
                {` ${location?.country}`}
              </Text>
            </Text>
            {/* Weather Image */}
            <View className="flex-row justify-center">
              <Image
                className="w-52 h-52"
                source={weatherImages[current?.condition?.text]}
                // source={require('../../assets/images/partlycloudy.png')}
              />
            </View>
            {/* Degree Celcius */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center  text-white text-xl tracking-widest ">
                {current?.condition?.text}
              </Text>
            </View>
            {/* Other Stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row gap-x-2 items-center">
                <Image
                  className="h-6 w-6"
                  source={require('../../assets/icons/wind.png')}
                />
                <Text className="text-white font-semibold text-base">
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row gap-x-2 items-center">
                <Image
                  className="h-6 w-6"
                  source={require('../../assets/icons/drop.png')}
                />
                <Text className="text-white font-semibold text-base">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row gap-x-2 items-center">
                <Image
                  className="h-6 w-6"
                  source={require('../../assets/icons/sun.png')}
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
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
              {weather?.forecast?.forecastday.map((item, index) => {
                let date = new Date(item.date);
                let options = {weekday: 'long'};
                let dayName = date.toLocaleDateString('en-US', options);
                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 gap-y-1 mr-4"
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
                    <Image
                      className="h-11 w-11"
                      source={
                        weatherImages[item?.day?.condition?.text] ??
                        weatherImages['other']
                      }
                    />

                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;
