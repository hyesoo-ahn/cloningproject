import React, {useContext, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {DetailContext} from '../../common/Context';

const Tab5 = ({navigation}) => {
  const context = useContext(DetailContext);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('itemLists')}>
      <Text>Tab Screen5</Text>
    </TouchableOpacity>
  );
};

export default Tab5;
