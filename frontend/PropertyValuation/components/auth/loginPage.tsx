// Login Page
import * as React from "react";
import { Component } from "react";
import { Navigator } from "react-native-navigation";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import { loginUser } from "../auth/authAction";
const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
});

const options = {
  order: ["email", "password"],
  fields: {
    email: {
      placeholder: "email@email.com",
      error:
        "Without and email address how are you going to reset your password when you ..."
    },
    password: { placeholder: "12345678" }
  },
  StyleSheet: "formStyles"
};

interface ILoginPageProps {
  navigator: Navigator;
  isAuthenicated: string;
  loginUser: (username: string, password: string) => Promise<void>;
}

export default class LoginPage extends Component<ILoginPageProps> {
  handleSubmit = () => {
    // do the things
    const value = this.refs.form.getValue(); // use that ref to get the form value
    console.log("value: ", value);
    this.props.navigator.showInAppNotification({
      screen: "example.app", // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to the in-app notification (optional)
      autoDismissTimerSec: 1 // auto dismiss notification in seconds
    });
  };

  changeInputValue = (value: string) => {
    console.log("Value: " + value);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>This is a login page!</Text>
        <Text style={styles.instructions}>
          Please login with your email or facebook account
        </Text>
        <Form
          ref="form" // assign a ref
          type={User}
          options={options}
        />
        <Button title="Login!" onPress={this.handleSubmit} />
      </View>
    );
  }
}

// export const Login = connect(
//   () => ({}),
//   dispatch => ({
//     loginUser: (username: string, password: string) =>
//       dispatch(loginUser(username, password))
//   })
// )(LoginPage);

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
