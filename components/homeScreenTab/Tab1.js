import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {currency} from '../../common/Method';

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
  // console.log("아이템 ===>", item);

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
          source={{url: item.url}}
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

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
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

      <View style={{paddingHorizontal: 25}}>
        <View
          style={{
            marginTop: 35,
            marginBottom: 15,
          }}>
          <Text style={{fontSize: 17, fontWeight: '500'}}>이 상품 어때요?</Text>
        </View>
      </View>
      <ProductList navigation={navigation} />
    </ScrollView>
  );
};

export default Tab1;

const ITEM = [
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

const ProductList = ({navigation}) => {
  return (
    <ScrollView
      style={{flexDirection: 'row', marginRight: 5}}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {ITEM.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('detail');
            }}>
            <Image
              source={{
                url: item.url,
              }}
              style={
                index == 0
                  ? {width: 130, height: 180, marginLeft: 25, marginBottom: 10}
                  : index == ITEM.length - 1
                  ? {
                      width: 130,
                      height: 180,
                      marginRight: 25,
                      marginLeft: 10,
                      marginBottom: 10,
                    }
                  : {width: 130, height: 180, marginLeft: 10, marginBottom: 10}
              }
            />
            <View
              style={
                index == 0
                  ? {
                      marginLeft: 25,
                      flexDirection: 'row',
                      justifyContent: 'center',
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
              <Text style={{fontSize: 13, fontWeight: '300', color: '#131313'}}>
                [{item.category}] {item.title}
              </Text>
            </View>
            <View
              style={
                index == 0
                  ? {
                      marginLeft: 25,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                      marginBottom: 10,
                    }
                  : {
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                      marginBottom: 10,
                    }
              }>
              <Text style={{fontWeight: 'bold'}}>{currency(item.price)}원</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
