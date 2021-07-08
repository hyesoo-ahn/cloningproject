import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import RenderItem from '../../screens/RenderItem';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Tab2 = navigation => {
  const [expanded, setExpanded] = useState(false);
  const [boxPosition, setBoxPosition] = useState('small');

  const toggleBox = () => {
    LayoutAnimation.configureNext(
      // LayoutAnimation.create(1300, 'easeInEaseOut'),

      LayoutAnimation.Presets.spring,
    );
    setBoxPosition(boxPosition === 'small' ? 'big' : 'small');
  };

  // useEffect(() => {
  //   setBoxPosition('big');
  // }, [boxPosition == 'small']);

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setExpanded(!expanded);
        }}>
        <Text>Press me to {expanded ? 'collapse' : 'expand'}!</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={style.tile}>
          <Text>I disappear sometimes!</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Toggle Layout" onPress={toggleBox} />
      </View>
      <View
        // style={{width: 50, height: 50, borderWidth: 1}}
        style={boxPosition === 'small' ? styles.box : styles.moveBig}></View>
    </View>
  );
};

const style = StyleSheet.create({
  tile: {
    backgroundColor: 'lightgrey',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default Tab2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: 'blue',
    borderWidth: 1,
  },
  moveBig: {
    // alignSelf: 'flex-end',
    height: 200,
    width: 200,
    borderWidth: 1,
    backgroundColor: 'pink',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});
