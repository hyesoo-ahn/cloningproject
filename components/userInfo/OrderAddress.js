import React from 'react';
import {View, Text} from 'react-native';

const OrderAddress = ({navigation}) => {
  return (
    <View>
      <Text>배송지 관리</Text>
      <Text onPress={() => navigation.navigate('addAddress')}>
        배송지 추가하기
      </Text>
      <Text>배송지 수정하기</Text>
    </View>
  );
};

export default OrderAddress;
