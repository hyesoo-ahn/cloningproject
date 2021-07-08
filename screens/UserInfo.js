import * as React from 'react';
import {View, Text, ScrollView} from 'react-native';

export default function UserInfo({navigation}) {
  return (
    <ScrollView>
      <Text>UserInfo Screen</Text>
      <Text onPress={() => navigation.navigate('coupon')}>쿠폰</Text>
      <Text>주문 내역</Text>
      <Text onPress={() => navigation.navigate('orderAddress')}>
        배송지 관리
      </Text>
    </ScrollView>
  );
}
