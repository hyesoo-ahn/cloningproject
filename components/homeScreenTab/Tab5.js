import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {DetailContext} from '../../common/Context';

const DATA = [
  {
    id: 1,
    url: 'https://img-cf.kurly.com/shop/data/main/1/pc_img_1624502361.jpg',
    title: '동행 세일',
  },
  {
    id: 1,
    url: 'https://img-cf.kurly.com/shop/data/main/1/pc_img_1621561009.jpg',
    title: '언제나 알뜰한 장보기',
  },
  {
    id: 1,
    url: 'https://img-cf.kurly.com/shop/data/main/1/pc_img_1625449790.jpg',
    title: '홈술 #2 소주 안주 기획전',
  },
  {
    id: 1,
    url: 'https://img-cf.kurly.com/shop/data/main/1/pc_img_1625038024.jpg',
    title: '여름 맞이 식단관리',
  },
];

const Tab5 = ({navigation}) => {
  const context = useContext(DetailContext);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {DATA.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('itemLists');
              context.handleStateChange('detailHeaderTitle', item.title);
            }}>
            <Image
              style={{width: '100%', height: 140, marginBottom: 15}}
              source={{
                uri: item.url,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Tab5;
