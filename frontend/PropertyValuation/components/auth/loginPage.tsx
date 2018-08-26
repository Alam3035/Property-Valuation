// Login Page
import * as React from "react";
import { Component } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import t from "tcomb-form-native";
const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
});

export default class LoginPage extends Component {
  handleSubmit = () => {
    // do the things
    // const value = this._form.getValue(); // use that ref to get the form value
    // console.log("value: ", value);
    this.props.navigator.showInAppNotification({
      screen: "example.app", // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to the in-app notification (optional)
      autoDismissTimerSec: 1 // auto dismiss notification in seconds
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>This is a login page!</Text>
        <Text style={styles.instructions}>
          Please login with your email or facebook account
        </Text>
        <Form type={User} />
        <Button title="Login!" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
