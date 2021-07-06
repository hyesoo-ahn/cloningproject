import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const ItemLists = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('detail')}>
      <Text>아이템리스트</Text>
    </TouchableOpacity>
  );
};

export default ItemLists;
