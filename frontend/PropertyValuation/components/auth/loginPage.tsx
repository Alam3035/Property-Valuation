// Login Page
import * as React from "react";
import { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class LoginPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>This is a login page!</Text>
        <Text style={styles.instructions}>
          Please login with your email or facebook account
        </Text>
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
