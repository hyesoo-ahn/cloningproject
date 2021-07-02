import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text} from 'react-native';
import {DetailHeader} from '../common/Header';

export default function DetailScreen({navigation, route}) {
  return (
    <>
      <DetailHeader
        navigation={navigation}
        productName={route.params.productName}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>DetailScreen Screen</Text>
      </View>
    </>
  );
}
