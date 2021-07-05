import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {DetailContext} from '../common/Context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {currency} from '../common/Method';

export default function DetailScreen({navigation, route}) {
  const context = useContext(DetailContext);
  const [clicked, setClicked] = useState(false);
  // const animationValue = useRef(new Animated.Value(0)).current;
  // const scaleValue = useRef(0);

  const handleLikePress = () => {
    setClicked(!clicked);
    // scaleValue.current = scaleValue.current === 0 ? 0.3 : 0;
    // Animated.timing(animationValue, {
    //   toValue: scaleValue.current,
    //   useNativeDriver: true,
    // }).start();
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
            style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <Ionicons name="share-outline" size={26} color="#131313" />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              paddingVertical: 20,
              borderBottomColor: '#d1d1d1',
            }}>
            <Text style={{fontSize: 18, color: '#171717', fontWeight: 'bold'}}>
              {currency(context.productInfo.price)}
            </Text>
            <Text style={{marginLeft: 3, color: '#171717'}}>원</Text>
          </View>
        </View>
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
          <TouchableOpacity onPress={handleLikePress}>
            <Animated.View
              style={{
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
                // transform: [
                //   {
                //     scale: animationValue.interpolate({
                //       inputRange: [0, 1],
                //       outputRange: [1, 2],
                //     }),
                //   },
                // ],
              }}>
              {clicked ? (
                <Ionicons name="heart" size={26} color="#fa622f" />
              ) : (
                <Ionicons name="heart-outline" size={26} color="#5F0E80" />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
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
