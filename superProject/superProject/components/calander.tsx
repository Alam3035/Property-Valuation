import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Calander = () => {
  return (
    <View style={styles.header}>
      <Text style={{fontSize: 28, alignSelf: 'center', color: '#D8BFD8'}}>
Woo woo      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    width: 500,
    backgroundColor: '#4B0082',
    justifyContent: 'center',
    position: 'absolute',
    top: 40
  }
});

export default Calander;