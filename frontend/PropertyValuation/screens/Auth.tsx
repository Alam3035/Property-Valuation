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
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";

type Props = {};
export default class Auth extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Property Valuation!</Text>
        <Text style={styles.instructions}>Please login or signup!</Text>
        <Button
          onPress={() =>
            this.props.navigator.dismissModal({
              animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            })
          }
          title="Continue without registration"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() =>
            this.props.navigator.showModal({
              screen: "example.loginPage",
              title: "Auth",
              passProps: {},
              navigatorStyle: {},
              animationType: "slide-up"
            })
          }
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() =>
            this.props.navigator.showModal({
              screen: "example.signUpPage",
              title: "Auth",
              passProps: {},
              navigatorStyle: {},
              animationType: "slide-up"
            })
          }
          title="Sign Up"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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
