import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import {DetailContext} from '../common/Context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {currency} from '../common/Method';
import {useIsFocused} from '@react-navigation/native';

const DATA = [
  {
    id: 1,
    title: '[포비베이글] 플레인 크림치즈',
    price: '8550',
  },
  {
    id: 1,
    title: '[포비베이글] 무화과 크림치즈',
    price: '8550',
  },
  {
    id: 1,
    title: '[포비베이글] 블루베리 크림치즈',
    price: '8550',
  },
  {
    id: 1,
    title: '[포비베이글] 블랙올리브 크림치즈',
    price: '8550',
  },
  {
    id: 1,
    title: '[포비베이글] 크랜베리 크림치즈',
    price: '8550',
  },
];

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function DetailScreen({navigation, route}) {
  const context = useContext(DetailContext);
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const reverseOpacity = useRef(new Animated.Value(0)).current;
  const [liked, setLiked] = useState(false);

  const like = value => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.7,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        // Animated.timing(value ? opacity : reverseOpacity, {
        //   toValue: 0,
        //   duration: 90,
        //   useNativeDriver: true,
        // }),
        // Animated.timing(value ? reverseOpacity : opacity, {
        //   toValue: 1,
        //   duration: 90,
        //   useNativeDriver: true,
        // }),
      ]),
    ]).start();
    setLiked(value);
  };

  const handleLikePress = () => {
    setClicked(!clicked);
  };

  const handlePurchase = () => {
    context.handleStateChange('isModalVisible', true);
  };

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          source={{uri: context.productInfo.url}}
          style={{width: '100%', height: 488, resizeMode: 'cover'}}
        />
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            flexDirection: 'row',
          }}>
          <View style={{flex: 6}}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#131313'}}>
              {context.product}
            </Text>
            <Text style={{marginTop: 7, color: '#979797'}}>
              뉴욕에서 맛본 바로 그 맛
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Ionicons name="share-outline" size={26} color="#131313" />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              paddingVertical: 20,
              borderBottomColor: '#d1d1d1',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{fontSize: 22, color: '#171717', fontWeight: 'bold'}}>
                {currency(context.productInfo.price)}
              </Text>
              <Text style={{marginLeft: 3, color: '#171717'}}>원</Text>
            </View>
            <View
              style={{
                marginTop: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginRight: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  alignItems: 'center',
                  borderColor: '#979797',
                }}>
                <Text style={{fontSize: 12, color: '#979797'}}>웰컴 5%</Text>
              </View>
              <View>
                <Text style={{color: '#131313', fontSize: 13}}>
                  개당 140원 적립
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ModalComponent />
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: 65,
          flexDirection: 'row',
          backgroundColor: '#fff',
          paddingHorizontal: 15,
          paddingTop: 10,
        }}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'lightgray',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            // onPress={() => like(!liked)}
            style={{
              width: 24,
              height: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {liked ? (
              <AnimatedIcon
                onPress={() => like(!liked)}
                name="heart"
                size={26}
                color="#fa622f"
                style={{transform: [{scale}]}}
              />
            ) : (
              <AnimatedIcon
                onPress={() => like(!liked)}
                name="heart-outline"
                size={26}
                color="#5F0E80"
                style={{transform: [{scale}]}}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handlePurchase}
          style={{
            flex: 6,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#5F0E80',
            borderRadius: 5,
            marginLeft: 10,
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
            구매하기
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export const ModalComponent = () => {
  const [data, setData] = useState(DATA);
  const context = useContext(DetailContext);
  useEffect(() => {
    const tempData = [...data];
    for (let i = 0; i < data.length; i++) {
      tempData[i].quentity = 0;
    }
    setData(tempData);
  }, []);

  const handlePlus = (item, index) => {
    // console.log(item, index);
    const tempData = [...data];
    tempData[index].quentity += 1;
    setData(tempData);
  };

  const handleMinus = (item, index) => {
    const tempData = [...data];
    if (item.quentity == 0) {
      tempData[index].quentity = 0;
    } else if (item.quentity > 0) {
      tempData[index].quentity -= 1;
      setData(tempData);
    }
  };

  const totalPrice = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].price * data[i].quentity;
    }
    return sum;
  };

  const handleAddCart = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].quentity > 0) {
        context.cartItem.push(data[i]);
      }
    }
    context.handleStateChange('isModalVisible', false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={context.isModalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
        presentationStyle="formSheet">
        {/* <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Text>hide Modal</Text>
        </Pressable>
        <TouchableOpacity>
          <Text>장바구니 담기</Text>
        </TouchableOpacity> */}

        <View
          style={{
            width: '100%',
            height: 60,
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#d1d1d1',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{width: 26}}
            onPress={() => context.handleStateChange('isModalVisible', false)}>
            <Ionicons name="close-outline" size={26} color="#131313" />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#424242'}}>
              상품 선택
            </Text>
          </View>
          <View style={{width: 26}}></View>
        </View>
        <ScrollView>
          <View
            style={{
              marginHorizontal: 20,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#d1d1d1',
            }}>
            <Text style={{color: 'gray'}}>{context.product}</Text>
          </View>
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  marginHorizontal: 20,
                  paddingVertical: 23,
                  borderBottomWidth: 1,
                  borderBottomColor: '#d1d1d1',
                }}>
                <Text>{item.title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    alignItems: 'flex-end',
                  }}>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    {currency(item.price)}원
                  </Text>
                  <View
                    style={{
                      width: 100,
                      height: 30,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: '#d1d1d1',
                      flexDirection: 'row',

                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleMinus(item, index)}
                      style={{flex: 1, alignItems: 'center'}}>
                      <Ionicons
                        name="remove-outline"
                        size={18}
                        color="#131313"
                      />
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text>{item.quentity}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handlePlus(item, index)}
                      style={{flex: 1, alignItems: 'center'}}>
                      <Ionicons name="add-outline" size={18} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={handleAddCart}
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'pink',
            marginBottom: 50,
            marginHorizontal: 20,
            borderRadius: 5,
            backgroundColor: '#5F0E80',
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
            {totalPrice() !== 0 && `${currency(totalPrice())}원`} 장바구니 담기
          </Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
