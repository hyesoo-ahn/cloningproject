import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('detail')}>
        <Text>go to detail screen</Text>
      </TouchableOpacity>
    </View>
  );
}
