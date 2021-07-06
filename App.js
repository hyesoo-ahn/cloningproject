import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import Recommandation from './screens/Recommandation';
import Category from './screens/Category';
import Search from './screens/Search';
import UserInfo from './screens/UserInfo';
import Header from './common/Header';
import DetailScreen from './screens/DetailScreen';
import CartScreen from './screens/CartScreen';
import Tab1 from './components/homeScreenTab/Tab1';
import Tab2 from './components/homeScreenTab/Tab2.js';
import Tab3 from './components/homeScreenTab/Tab3.js';
import Tab4 from './components/homeScreenTab/Tab4.js';
import Tab5 from './components/homeScreenTab/Tab5.js';
import {DetailHeader} from './common/Header';
import {DetailContext} from './common/Context';
import DetailImage from './components/detailScreen/DetailImage';
import DetailInfo from './components/detailScreen/DetailInfo';
import Review from './components/detailScreen/Review';
import ProductFaq from './components/detailScreen/ProductFaq';
import ItemLists from './screens/ItemLists';

const TopTab = createMaterialTopTabNavigator();
const CategoryTopTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Modal = createStackNavigator();

const screenWidth = Dimensions.get('window').width;

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: screenWidth,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {state.routes.map((item, index) => {
        const isFocused = state.index === index;
        // index를 boolean으로 바꿔준다.
        // console.log(isFocused);
        const label = item.name;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: item.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(item.name);
          }
        };
        return (
          <TouchableOpacity
            isFocused={isFocused}
            onPress={onPress}
            key={`tab_${index}`}
            style={
              isFocused
                ? {
                    width: screenWidth / 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1.9,
                    borderBottomColor: '#4a0a66',
                    height: '100%',
                  }
                : {
                    width: screenWidth / 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }
            }>
            <Text
              style={
                isFocused
                  ? {color: '#5f0e80', fontWeight: 'bold', fontSize: 15}
                  : {color: 'gray', fontSize: 15}
              }
              isFocused={isFocused}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const HomeNavi = () => {
  const context = useContext(DetailContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    context.handleStateChange('route', 'HomeNavi');
  }, [isFocused]);

  return (
    <TopTab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <TopTab.Screen name="컬리추천" component={Tab1} />
      <TopTab.Screen name="신상품" component={Tab2} />
      <TopTab.Screen name="베스트" component={Tab3} />
      <TopTab.Screen name="알뜰쇼핑" component={Tab4} />
      <TopTab.Screen name="특가/혜택" component={Tab5} />
    </TopTab.Navigator>
  );
};

const DetailNavi = ({navigation}) => {
  const context = useContext(DetailContext);

  useEffect(() => {
    context.handleStateChange('route', 'DetailNavi');
  }, []);
  return (
    <>
      <DetailHeader navigation={navigation} />
      <TopTab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <TopTab.Screen name="상품설명" component={DetailScreen} />
        <TopTab.Screen name="상품이미지" component={DetailImage} />
        <TopTab.Screen name="상세정보" component={DetailInfo} />
        <TopTab.Screen name="후기" component={Review} />
        <TopTab.Screen name="상품문의" component={ProductFaq} />
      </TopTab.Navigator>
    </>
  );
};

const ItemListsNavi = ({navigation}) => {
  return (
    <>
      <DetailHeader navigation={navigation} />
      <CategoryTopTab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <CategoryTopTab.Screen name="전체보기" component={ItemLists} />
      </CategoryTopTab.Navigator>
    </>
  );
};

const TabNavi = ({navigation}) => {
  return (
    <>
      <Header navigation={navigation} />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === '홈') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === '추천') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === '카테고리') {
              iconName = focused ? 'menu' : 'menu';
            } else if (route.name === '검색') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === '마이컬리') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#5f0e80',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="홈" component={HomeNavi} />
        <Tab.Screen name="추천" component={Recommandation} />
        <Tab.Screen name="카테고리" component={Category} />
        <Tab.Screen name="검색" component={Search} />
        <Tab.Screen name="마이컬리" component={UserInfo} />
      </Tab.Navigator>
    </>
  );
};

const StackNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabNavi"
        component={TabNavi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="detail"
        component={DetailNavi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="itemLists"
        component={ItemListsNavi}
        options={{headerShown: false}}
      />
      {/* 탭이 안보이려면 stack으로 덮어야됨 detail페이지는 탭이 안보여야하자나 ! 그래서 같은 선상에 있어야대 */}
    </Stack.Navigator>
  );
};

export default function App({navigation}) {
  const _handleStateChange = (state, value) => {
    setData(prevState => {
      return {
        ...prevState,
        [state]: value,
      };
    });
  };

  const [data, setData] = useState({
    route: '',
    product: '',
    productInfo: {},
    cartItem: [],
    isModalVisible: false,
    handleStateChange: _handleStateChange,
  });

  return (
    <>
      <SafeAreaView
        style={
          data.route == 'HomeNavi'
            ? {backgroundColor: '#5f0e80'}
            : {backgroundColor: '#fff'}
        }
      />
      <StatusBar
        barStyle={data.route == 'HomeNavi' ? 'light-content' : 'dark-content'}
      />
      <DetailContext.Provider value={data}>
        <NavigationContainer>
          <Modal.Navigator mode="modal" animationType="slide">
            <Modal.Screen
              name="stackNavi"
              component={StackNavi}
              options={{headerShown: false}}
            />
            <Modal.Screen
              name="cart"
              component={CartScreen}
              options={{headerShown: false}}
            />
          </Modal.Navigator>
        </NavigationContainer>
      </DetailContext.Provider>
      <SafeAreaView></SafeAreaView>
    </>
  );
}
