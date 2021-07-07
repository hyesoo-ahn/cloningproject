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

import {withNavigation} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Category from './Category';

const CATEGORY = [
  {
    id: 1,
    title: '전체보기',
  },
  {
    id: 2,
    title: '간편식/반찬',
  },
  {
    id: 3,
    title: '베이커리/간식',
  },
  {
    id: 4,
    title: '수산',
  },
  {
    id: 5,
    title: '정육/달걀',
  },
  {
    id: 6,
    title: '신선/견과',
  },
  {
    id: 7,
    title: '기타',
  },
];

const pageWidth = Dimensions.get('window').width;

const renderItem = ({item}) => {
  const handlePress = () => {
    navigation.navigate('detail');
  };
  return (
    <View
      style={{
        width: pageWidth,
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}>
      {/* <Text>
        render item{item.id} {item.title}
      </Text> */}

      {/* item */}
      <View
        style={{
          flexWrap: 'wrap',
          width: '100%',

          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {item.title == '전체보기'
          ? DATA.map((listItem, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => handlePress(item)}>
                  <Image
                    style={{width: 160, height: 220, marginBottom: 50}}
                    source={{
                      uri: listItem.image,
                    }}
                  />
                </TouchableOpacity>
              );
            })
          : DATA.filter(filterItem => filterItem.category == item.title).map(
              (mapItem, index) => {
                return (
                  <TouchableOpacity key={index} activeOpacity={0.8}>
                    <Image
                      style={{width: 160, height: 220, marginBottom: 50}}
                      source={{
                        uri: mapItem.image,
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

const DATA = [
  {
    id: 1,
    title: '[델리치오] 호주산 목초육 안심 스테이그 250g(냉장)',
    price: 1900,
    discount: 13,
    image:
      'https://images.unsplash.com/photo-1586511934875-5c5411eebf79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    category: '간편식/반찬',
  },
  {
    id: 2,
    title: '[푸드렐라] 아이스크림',
    price: 8900,
    discount: 41,
    image:
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 와규 햄버거 패티',
    price: 11000,
    discount: 35,
    image:
      'https://images.unsplash.com/photo-1542820242-dd9053219a22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    category: '간편식/반찬',
  },
  {
    id: 3,
    title: '[델리치오] 과일 샐러드',
    price: 11000,
    discount: 35,
    image:
      'https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: 11000,
    discount: 35,
    image:
      'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: 11000,
    discount: 35,
    image:
      'https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: 11000,
    discount: 35,
    image:
      'https://images.unsplash.com/photo-1477925518023-22b33cbd802c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80',
  },
  {
    id: 3,
    title: '[델리치오] 닭가슴살 샐러드',
    price: 11000,
    discount: 35,
    image:
      'https://images.unsplash.com/photo-1585939268339-886c9643ee98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
];

const ItemLists = ({navigation}) => {
  const [focused, setFocused] = useState('전체보기');
  const flatListRef = useRef(null);
  const categoryRef = useRef(null);
  const [page, setPage] = useState(0);

  const onScroll = e => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / pageWidth);
    setPage(newPage);
    setFocused(CATEGORY[newPage].title);
  };

  useEffect(() => {
    const findDataIndex = element => element.title == focused;
    const index = CATEGORY.findIndex(findDataIndex);

    if (index > 0 && index <= CATEGORY.length - 2) {
      for (let i = 0; i < CATEGORY.length - 2; i++) {
        if (index == i + 1) {
          categoryRef.current.scrollTo({
            x: i * 50,
            y: 0,
            animated: true,
          });
        }
      }
    }
  }, [focused]);

  return (
    <>
      <ItemListsHeader navigation={navigation} />
      <View style={{backgroundColor: '#fff'}}>
        <ScrollView
          ref={categoryRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            height: 43,
            borderBottomColor: '#d1d1d1',
            borderBottomWidth: 1,
            backgroundColor: '#fff',
          }}>
          {CATEGORY.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setFocused(item.title);
                  flatListRef.current.scrollToIndex({
                    animated: false,
                    index: index,
                  });
                }}
                style={
                  focused == item.title
                    ? {
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 2,
                        borderBottomColor: '#5f0e80',
                        paddingHorizontal: 10,
                      }
                    : {
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // marginRight: 15,
                        paddingHorizontal: 10,
                      }
                }>
                <Text
                  style={
                    focused == item.title
                      ? {color: '#5f0e80', fontWeight: '600', fontSize: 15}
                      : {color: '#828282', fontSize: 15}
                  }>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
          }}>
          <FlatList
            navigation={navigation}
            ref={flatListRef}
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={{}}
            data={CATEGORY}
            decelerationRate="fast"
            horizontal
            keyExtractor={item => item.id}
            onScroll={onScroll}
            pagingEnabled
            renderItem={renderItem}
            snapToInterval={pageWidth}
            snapToAlignment="start"
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
        {/* <TouchableOpacity
        style={{backgroundColor: '#fff'}}
        onPress={() => navigation.navigate('detail')}>
        <Text>아이템리스트</Text>
      </TouchableOpacity> */}
      </View>
    </>
  );
};

export default ItemLists;

export const ItemListsHeader = ({navigation}) => {
  const context = useContext(DetailContext);
  const [count, setCount] = useState(context.cartItem.length);

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
        <Ionicons name="chevron-back-outline" size={23} color="#131313" />
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
