import * as React from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
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
import Animated from 'react-native-reanimated';

const TopTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Modal = createStackNavigator();

const screenWidth = Dimensions.get('window').width;

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: screenWidth - 10,
        marginHorizontal: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
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
                    borderBottomWidth: 1.7,
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
                  ? {color: '#5f0e80', fontWeight: 'bold', fontSize: 14}
                  : {color: 'gray', fontSize: 14}
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

            // You can return any component that you like here!
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
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default function App({navigation}) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#5f0e80'}} />
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Modal.Navigator mode="modal">
          <Modal.Screen
            name="stackNavi"
            component={StackNavi}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="cart"
            component={CartScreen}
            options={{headerShown: false}}
          />
        </Modal.Navigator>
      </NavigationContainer>

      <SafeAreaView></SafeAreaView>
    </>
  );
}
