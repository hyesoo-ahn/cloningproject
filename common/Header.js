import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DetailContext} from './Context';
import {useIsFocused} from '@react-navigation/native';

const MainHeader = ({navigation}) => {
  const context = useContext(DetailContext);

  return (
    <View
      style={{
        width: '100%',
        height: 50,
        backgroundColor: '#5f0e80',
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
        {context.cartItem.length !== 0 && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              width: 13,
              height: 13,
              borderRadius: 13 / 2,
              right: 0,
              top: -2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
                color: '#5f0e80',
                fontWeight: 'bold',
              }}>
              {context.cartItem.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

export const DetailHeader = ({navigation, productName, route}) => {
  const context = useContext(DetailContext);
  const [count, setCount] = useState(context.cartItem.length);
  const isFocused = useIsFocused();

  useEffect(() => {
    setCount(context.cartItem.length);
  }, [context.isModalVisible]);

  return (
    <View
      style={{
        backgroundColor: '#fff',
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
        <Text style={{fontSize: 15, fontWeight: '600'}}>{context.product}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('cart');
        }}>
        <Ionicons name="cart-outline" size={25} color="black" />
        {count !== 0 && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#5f0e80',
              width: 13,
              height: 13,
              borderRadius: 13 / 2,
              right: 0,
              top: -2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
                color: '#fff',
                fontWeight: 'bold',
              }}>
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
