/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Component } from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native';
import MortgageInput from './components/mortgage';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
     
        <MortgageInput />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#4B0082',
  },
});
