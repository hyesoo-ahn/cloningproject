import React, {useState, useRef, useEffect} from 'react';
import {Text, View, SafeAreaView, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const Tab3 = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Dot marginRight={7} />
      <Dot marginRight={7} delay={600} />
      <Dot delay={1200} />
    </View>
  );
};

export default Tab3;

const Dot = ({marginRight, delay = 0}) => {
  const [dotColor, setDotColor] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),

      Animated.loop(
        Animated.timing(dotColor, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: false,
        }),
      ),
    ]).start();
  }, []);

  const dotInterpolate = dotColor.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [
      'rgb(170, 170, 170)',
      'rgb(230, 230, 230)',
      'rgb(230, 230, 230)',
      'rgb(170, 170, 170)',
    ],
  });

  return (
    <Animated.View
      style={{
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        marginRight: marginRight,
        backgroundColor: dotInterpolate,
      }}></Animated.View>
  );
};
