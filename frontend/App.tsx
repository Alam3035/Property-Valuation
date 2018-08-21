/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, { Component } from "react";
import * as React from "react";
import { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import { NavigationComponentProps } from "react-native-navigation";

import Icon from "react-native-vector-icons/Entypo";

interface Props extends NavigationComponentProps {}

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

// type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigator.switchToTab({
              tabIndex: 0 // Here is the tab index
            })
          }
        >
          <Text style={styles.welcome}>Welcome to Real Estate Valuation!</Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Icon.Button
          name="login"
          backgroundColor="#a9a9a9"
          size={36}
          onPress={() =>
            this.props.navigator.switchToTab({
              tabIndex: 0 // Here is the tab index
            })
          }
        >
          Continue without Login
        </Icon.Button>
        <Icon.Button name="login" backgroundColor="#9400d3" size={36}>
          Local Login
        </Icon.Button>
        <Icon.Button name="facebook" backgroundColor="#3b5998" size={36}>
          Login with Facebook
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
