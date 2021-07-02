import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MainHeader = ({navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        backgroundColor: '#5f0e80',
        // backgroundColor: "pink",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
      }}>
      <View style={{width: 24}}></View>

      <Image
        source={{
          uri: 'https://res.kurly.com/images/marketkurly/logo/logo_type2_x2.png',
        }}
        style={{width: 65, height: 38, resizeMode: 'contain'}}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('cart');
        }}>
        <Ionicons name="cart-outline" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

export const DetailHeader = ({navigation, productName}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={25} color="#5f0e80" />
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 15, fontWeight: '600'}}>{productName}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('cart');
        }}>
        <Ionicons name="cart-outline" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};
