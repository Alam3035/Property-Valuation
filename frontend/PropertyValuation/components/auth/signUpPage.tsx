// Login Page
import * as React from "react";
import { Component } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import FbIcon from "react-native-vector-icons/FontAwesome";
import t from "tcomb-form-native";
const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

export default class SignUpPage extends Component {
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
        <Text style={styles.welcome}>This is a sign-up page!</Text>
        <Text style={styles.instructions}>
          Please sign-up with your email or facebook account
        </Text>
        <Form
          // ref={c => (this._form = c)} // assign a ref
          type={User}
        />
        <Button title="Sign Up!" onPress={this.handleSubmit} />
        <TouchableOpacity>
          <FbIcon name="facebook" size={30} />
        </TouchableOpacity>
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
