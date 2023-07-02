import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'

import { theme } from '../theme/index';

const Home = () => {
    return (
        <View style={tw`flex-1 relative`}>
            <StatusBar style="light" />
            <Image blurRadius={70} source={require('../assets/images/bg.png')} style={tw`absolute h-full w-full`} />
            <SafeAreaView style={tw`flex flex-1`}>
               <View style={[tw`mx-4 relative z-50 mt-10`, {height: '7%'}]}>
                    <View style={[tw`flex-row  justify-end items-center rounded-full`, {backgroundColor: theme.bgWhite(0.3)} ]}>
                        <TextInput 
                            placeholder='Search city...'
                            placeholderTextColor={'lightgray'}
                            style={tw`pl-6 h-10 flex-1 text-base text-white`}
                        />
                        <TouchableOpacity style={[tw`rounded-full p-3 m-1`,{backgroundColor: theme.bgWhite(0.3)}]}>
                            <MagnifyingGlassIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>
               </View>
            </SafeAreaView>
        </View>
    );
};

export default Home;
