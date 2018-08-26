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
            this.props.navigator.pop({
              animated: true, // does the pop have transition animation or does it happen immediately (optional)
              animationType: "fade" // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
            })
          }
          title="Continue without registration"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() =>
            this.props.navigator.push({
              screen: "example.loginPage", // unique ID registered with Navigation.registerScreen
              title: undefined, // navigation bar title of the pushed screen (optional)
              subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
              titleImage: require("../src/icons/IC-Remove-Red-Eye-24px.png"), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
              passProps: {}, // Object that will be passed as props to the pushed screen (optional)
              animated: true, // does the push have transition animation or does it happen immediately (optional)
              animationType: "fade", // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
              backButtonTitle: undefined, // override the back button title (optional)
              backButtonHidden: false, // hide the back button altogether (optional)
              navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
              navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
              // enable peek and pop - commited screen will have `isPreview` prop set as true.
              previewView: undefined, // react ref or node id (optional)
              previewHeight: undefined, // set preview height, defaults to full height (optional)
              previewCommit: true, // commit to push preview controller to the navigation stack (optional)
              previewActions: [
                {
                  // action presses can be detected with the `PreviewActionPress` event on the commited screen.
                  id: "", // action id (required)
                  title: "", // action title (required)
                  style: undefined, // 'selected' or 'destructive' (optional)
                  actions: [] // list of sub-actions
                }
              ]
            })
          }
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() =>
            this.props.navigator.push({
              screen: "example.signUpPage", // unique ID registered with Navigation.registerScreen
              title: undefined, // navigation bar title of the pushed screen (optional)
              subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
              titleImage: require("../src/icons/IC-Remove-Red-Eye-24px.png"), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
              passProps: {}, // Object that will be passed as props to the pushed screen (optional)
              animated: true, // does the push have transition animation or does it happen immediately (optional)
              animationType: "fade", // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
              backButtonTitle: undefined, // override the back button title (optional)
              backButtonHidden: false, // hide the back button altogether (optional)
              navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
              navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
              // enable peek and pop - commited screen will have `isPreview` prop set as true.
              previewView: undefined, // react ref or node id (optional)
              previewHeight: undefined, // set preview height, defaults to full height (optional)
              previewCommit: true, // commit to push preview controller to the navigation stack (optional)
              previewActions: [
                {
                  // action presses can be detected with the `PreviewActionPress` event on the commited screen.
                  id: "", // action id (required)
                  title: "", // action title (required)
                  style: undefined, // 'selected' or 'destructive' (optional)
                  actions: [] // list of sub-actions
                }
              ]
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
