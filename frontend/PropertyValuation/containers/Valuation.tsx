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
  TouchableOpacity,
  Image
} from "react-native";

import { NavigationComponentProps } from "react-native-navigation";
import { Navigation } from "react-native-navigation";
import Auth from "../containers/Auth";
Navigation.registerComponent("example.auth", () => Auth);

interface Props extends NavigationComponentProps {}

const instructions = Platform.select({
  ios: "Please fill in the valuation form.",
  android: "Please fill in the valuation form."
});

// type Props = {};
export default class Valuation extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Valuation</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
