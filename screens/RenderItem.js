import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import {DetailContext} from '../common/Context';

const pageWidth = Dimensions.get('window').width;

const DATA = [
  {
    id: 1,
    title: '[델리치오] 호주산 안심 스테이그 250g(냉장)',
    price: '1900',
    discount: 13,
    url: 'https://images.unsplash.com/photo-1586511934875-5c5411eebf79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    category: '간편식/반찬',
  },
  {
    id: 2,
    title: '[푸드렐라] 아이스크림',
    price: '8900',
    discount: 41,
    url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 와규 햄버거 패티',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1542820242-dd9053219a22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    category: '간편식/반찬',
  },
  {
    id: 3,
    title: '[델리치오] 과일 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1477925518023-22b33cbd802c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1585939268339-886c9643ee98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1606931104210-bb4699e48896?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    category: '정육/달걀',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1562918005-50afb98e5d32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    category: '정육/달걀',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1559814048-149b70765d47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80',
    category: '수산',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80',
    category: '수산',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1610364274504-7c79ce864793?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    category: '베이커리/간식',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: '11000',
    discount: 35,
    url: 'https://images.unsplash.com/photo-1613929231151-d7571591259e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    category: '베이커리/간식',
  },
];

const RenderItem = ({item, navigation}) => {
  const context = useContext(DetailContext);
  if (item) {
    const {title} = item.item;
  }
  const {title} = item.item;
  const handlePress = listItem => {
    navigation.navigate('detail');
    context.handleStateChange('product', listItem.title);
    context.handleStateChange('productInfo', listItem);
  };

  return (
    <View
      style={{
        width: pageWidth,
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}>
      {/* item */}
      <View
        style={{
          flexWrap: 'wrap',
          width: '100%',

          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {title == '전체보기'
          ? DATA.map((listItem, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => handlePress(listItem)}>
                  <Image
                    style={{width: 160, height: 220, marginBottom: 50}}
                    source={{
                      uri: listItem.url,
                    }}
                  />
                </TouchableOpacity>
              );
            })
          : DATA.filter(filterItem => filterItem.category == title).map(
              (mapItem, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handlePress(mapItem)}
                    key={index}
                    activeOpacity={0.8}>
                    <Image
                      style={{width: 160, height: 220, marginBottom: 50}}
                      source={{
                        uri: mapItem.url,
                      }}
                    />
                  </TouchableOpacity>
                );
              },
            )}
      </View>
    </View>
  );
};

export default RenderItem;
