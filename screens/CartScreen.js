import React, {useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {DetailContext} from '../common/Context';
import {useIsFocused} from '@react-navigation/core';

export default function CartScreen({navigation}) {
  const context = useContext(DetailContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    // context.handleStateChange('route', 'cart');
  }, [isFocused]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{JSON.stringify(context.cartItem)}</Text>
    </View>
  );
}
