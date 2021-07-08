import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {currency} from '../../common/Method';
import {DetailContext} from '../../common/Context';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DATA = [
  {
    id: 1,
    url: 'https://res.kurly.com/images/event/join/200115/mobile/img_main.jpg',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1557748362-4e95f0de4f6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1369&q=80',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1592951271867-b4e76e837658?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
  },
];

const pageWidth = Dimensions.get('window').width;

const renderItem = ({item}) => {
  // console.log('아이템 ===>', item);
  return (
    <>
      <View
        style={{
          width: pageWidth,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: item.url,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    </>
  );
};

const Tab1 = ({navigation}) => {
  const [page, setPage] = useState(0);
  const onScroll = e => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / pageWidth);
    setPage(newPage);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <View>
          <FlatList
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={{
              height: pageWidth - 35,
            }}
            data={DATA}
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

          <View
            style={{
              width: 40,
              height: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
              position: 'absolute',
              bottom: 20,
              right: 15,
            }}>
            <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
              {page + 1} / {DATA.length}
            </Text>
          </View>
        </View>

        <ProductList
          navigation={navigation}
          data={ITEM1}
          title={'이 상품 어때요?'}
        />

        <ProductList
          navigation={navigation}
          data={ITEM2}
          title={'놓치면 후회할 가격'}
          style={{backgroundColor: '#f7f7f7'}}
        />
      </ScrollView>
    </>
  );
};

export default Tab1;

const ITEM1 = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1589661329742-713c46926e34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80',
    price: '2800',
    category: '픽어베이글',
    title: '베이글 8종',
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1558745010-d2a3c21762ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    price: '2500',
    category: '포비베이글',
    title: '시그니처 베이글 6종',
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    price: '9000',
    category: '포비베이글',
    title: '크림치즈 8종',
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=933&q=80',
    price: '2300',
    category: '오베이글',
    title: '쌀로 만든 담백한 베이글 5종',
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1589661329742-713c46926e34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80',
    price: '4500',
    category: '그래밀',
    title: '통밀식사빵 2종',
  },
];

const ITEM2 = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1555126634-323283e090fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: '2800',
    category: '픽어베이글',
    title: '베이글 8종',
    discount: 15,
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1590975417628-4524f658b5a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    price: '2500',
    category: '포비베이글',
    title: '시그니처 베이글 6종',
    discount: 19,
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80',
    price: '9000',
    category: '포비베이글',
    title: '크림치즈 8종',
    discount: 30,
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=931&q=80',
    price: '2300',
    category: '오베이글',
    title: '쌀로 만든 담백한 베이글 5종',
    discount: 13,
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1589661329742-713c46926e34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80',
    price: '4500',
    category: '그래밀',
    title: '통밀식사빵 2종',
    discount: 25,
  },
];

const ProductList = ({navigation, data, style, title}) => {
  const context = useContext(DetailContext);
  const handlePress = item => {
    navigation.navigate('detail');
    context.handleStateChange('product', `[${item.category}] ${item.title}`);
    context.handleStateChange('productInfo', item);
  };

  return (
    <View style={{...style, paddingBottom: 20}}>
      <TouchableOpacity
        onPress={() => {
          context.handleStateChange('detailHeaderTitle', '놓치면 후회할 가격');
          navigation.navigate('itemLists');
        }}
        style={{
          marginTop: 25,
          marginBottom: 15,
          marginLeft: 25,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 17, fontWeight: '500'}}>{title}</Text>
        {title !== '이 상품 어때요?' && (
          <Ionicons name="chevron-forward-outline" size={20} color="#979797" />
        )}
      </TouchableOpacity>
      <ScrollView
        style={{flexDirection: 'row'}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={index}
              onPress={
                //   () => {
                //   navigation.navigate('detail', {
                //     productName: `[${item.category}] ${item.title}`,
                //   });
                // }
                () => handlePress(item)
              }>
              <Image
                source={{
                  uri: item.url,
                }}
                style={
                  index == 0
                    ? {
                        width: 130,
                        height: 180,
                        marginLeft: 25,
                        marginBottom: 10,
                      }
                    : index == data.length - 1
                    ? {
                        width: 130,
                        height: 180,
                        marginRight: 25,
                        marginLeft: 10,
                        marginBottom: 10,
                      }
                    : {
                        width: 130,
                        height: 180,
                        marginLeft: 10,
                        marginBottom: 10,
                      }
                }
              />
              <View
                style={
                  index == 0
                    ? {
                        marginLeft: 25,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 130,
                      }
                    : {
                        marginLeft: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 130,
                      }
                }>
                <Text
                  style={{fontSize: 14, fontWeight: '300', color: '#131313'}}>
                  [{item.category}] {item.title}
                </Text>
              </View>
              <View
                style={
                  index == 0
                    ? {
                        marginLeft: 25,
                        marginTop: 4,
                        marginBottom: 10,
                      }
                    : {
                        marginLeft: 10,
                        marginTop: 4,
                        marginBottom: 10,
                      }
                }>
                {!item.discount && (
                  <Text style={{fontWeight: 'bold'}}>
                    {currency(item.price)}원
                  </Text>
                )}
                <View
                  style={{
                    marginTop: 3,
                    marginBottom: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      marginRight: 3,
                      color: '#FA622F',
                      fontWeight: 'bold',
                      fontSize: 13,
                    }}>
                    {item.discount && `${item.discount}%`}
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>
                    {' '}
                    {item.discount &&
                      `${currency(
                        Math.floor((1 - 0.01 * item.discount) * item.price),
                      )}원`}
                  </Text>
                </View>
                {item.discount && (
                  <Text
                    style={{
                      fontWeight: '300',
                      fontSize: 12,
                      marginTop: 1,
                      textDecorationLine: 'line-through',
                      color: 'gray',
                    }}>
                    {currency(item.price)}원
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
