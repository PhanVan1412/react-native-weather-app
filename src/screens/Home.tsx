import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { debounce } from 'lodash';
import * as Progress from 'react-native-progress';

import { CalculatorIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';

import { theme } from '../theme/index';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants/index';

const Home = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const handleLocation = (loc: any) => {
        setLocations([]);
        setShowSearch(false);
        setLoading(true);
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7',
        }).then((data) => {
            setWeather(data);
            setLoading(false);
        });
    };
    const handleSearch = (value: any) => {
        if (value.length > 2) {
            fetchLocations({ cityName: value }).then((data) => {
                setLocations(data);
            });
        }
    };

    useEffect(() => {
        fetchMyWeatherData();
    }, []);

    const fetchMyWeatherData = async () => {
        fetchWeatherForecast({
            cityName: 'Ho Chi Minh',
            days: '7',
        }).then((data) => {
            setWeather(data);
            setLoading(false);
        });
    };

    const handelTextDebounce = useCallback(debounce(handleSearch, 1200), []);
    const { current, location } = weather;

    return (
        <View style={tw`flex-1 relative`}>
            <StatusBar style="light" />
            <Image blurRadius={70} source={require('../assets/images/bg.png')} style={tw`absolute h-full w-full`} />
            {loading ? (
                <View style={tw`flex-1 flex-row justify-center items-center`}>
                    <Progress.Bar progress={0.3} width={200} />
                </View>
            ) : (
                <SafeAreaView style={tw`flex flex-1 mx-4`}>
                    <View style={[tw`relative z-50 mt-10`, { height: '7%' }]}>
                        <View
                            style={[
                                tw`flex-row  justify-end items-center rounded-full`,
                                { backgroundColor: showSearch ? theme.bgWhite(0.3) : 'transparent' },
                            ]}
                        >
                            {showSearch ? (
                                <TextInput
                                    onChangeText={handelTextDebounce}
                                    placeholder="Search city..."
                                    placeholderTextColor={'lightgray'}
                                    style={tw`pl-6 h-10 flex-1 text-base text-white`}
                                />
                            ) : null}
                            <TouchableOpacity
                                onPress={() => setShowSearch(!showSearch)}
                                style={[tw`rounded-full p-3 m-1`, { backgroundColor: theme.bgWhite(0.3) }]}
                            >
                                <MagnifyingGlassIcon size="25" color="white" />
                            </TouchableOpacity>
                        </View>
                        {locations.length > 0 && showSearch ? (
                            <View style={tw`absolute w-full bg-gray-300 top-16 rounded-3xl`}>
                                {locations.map((loc: any, index) => {
                                    let showBorder = index + 1 != locations.length;
                                    let borderClass = showBorder ? ' border-b-2 border-b-gray-400' : '';
                                    return (
                                        <TouchableOpacity
                                            onPress={() => handleLocation(loc)}
                                            key={index}
                                            style={tw`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}
                                        >
                                            <MapPinIcon size="20" color="gray" style={tw`mr-1`} />
                                            <Text style={tw`text-black text-lg ml-2`}>
                                                {loc?.name}, {loc?.country}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ) : null}
                    </View>
                    {/* {forecast section} */}
                    <View style={tw`mx-4 flex justify-around flex-1 mb-2`}>
                        {/* {location} */}
                        <Text style={tw`text-white text-center text-2xl font-bold`}>
                            {location?.name}
                            <Text style={tw`text-lg font-semibold text-gray-300`}>{` ${location?.country}`}</Text>
                        </Text>
                        {/* {weather image} */}
                        <View style={tw`flex-row justify-center mt-10`}>
                            <Image source={weatherImages[current?.condition?.text || 'other']} style={tw`w-52 h-52`} />
                        </View>
                        {/* {degree celcius} */}
                        <View style={tw`mt-10`}>
                            <Text style={tw`text-center font-bold text-white text-6xl ml-5`}>
                                {current?.temp_c}&#176;
                            </Text>
                            <Text style={tw`text-white text-center text-xl tracking-wide`}>
                                {current?.condition?.text}
                            </Text>
                        </View>
                        {/* {other state} */}
                        <View style={tw`flex-row justify-between mx-1 mt-10`}>
                            <View style={tw`flex-row gap-2 items-center`}>
                                <Image source={require('../assets/icons/wind.png')} style={tw`h-6 w-6`} />
                                <Text style={tw`text-white font-semibold text-base`}>{current?.wind_kph}km</Text>
                            </View>
                            <View style={tw`flex-row gap-2 items-center`}>
                                <Image source={require('../assets/icons/drop.png')} style={tw`h-6 w-6`} />
                                <Text style={tw`text-white font-semibold text-base`}>{current?.humidity}%</Text>
                            </View>
                            <View style={tw`flex-row gap-2 items-center`}>
                                <Image source={require('../assets/icons/sun.png')} style={tw`h-6 w-6`} />
                                <Text style={tw`text-white font-semibold text-base`}>{current?.uv}uv</Text>
                            </View>
                        </View>
                    </View>
                    {/* {forecast for next days} */}
                    <View style={tw`mb-2 mt-8`}>
                        <View style={tw`flex-row items-center mx-1 mb-4`}>
                            <CalculatorIcon size="22" color="white" />
                            <Text style={tw`text-white text-base`}>Daily forecast</Text>
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {weather?.forecast?.forecastday?.map((item: object, index: number) => {
                                let date = new Date(item?.date);
                                let options = { weekday: 'long' };
                                let dayName = date.toLocaleDateString('en-US', options);
                                dayName = dayName.split(',')[0];
                                return (
                                    <View
                                        key={index}
                                        style={[
                                            tw`flex justify-center items-center w-24 rounded-3xl py-3 mr-2`,
                                            { backgroundColor: theme.bgWhite(0.15) },
                                        ]}
                                    >
                                        <Image
                                            source={
                                                weatherImages[
                                                    item?.day?.condition?.text || `https:${item?.day?.condition?.icon}`
                                                ]
                                            }
                                            style={tw`h-11 w-11`}
                                        />
                                        <Text style={tw`text-white`}>{dayName}</Text>
                                        <Text style={tw`text-white text-xl font-semibold`}>
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

export default Home;
