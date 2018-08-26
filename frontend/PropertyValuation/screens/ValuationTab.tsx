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
import { Platform, StyleSheet, Text, View, AlertIOS } from "react-native";

import { NavigationComponentProps } from "react-native-navigation";
import { Navigation } from "react-native-navigation";
import Auth from "./Auth";
Navigation.registerComponent("example.auth", () => Auth);

interface Props extends NavigationComponentProps {}

const instructions = Platform.select({
  ios: "Please fill in the valuation form.",
  android: "Please fill in the valuation form."
});

// type Props = {};
export default class Valuation extends Component<Props> {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("../src/icons/IC-Favorite-Border-24px.png"), // for icon button, provide the local image asset name
        id: "favorite" // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
      {
        // title: "Mark favorite", // for a textual button, provide the button title (label)
        id: "favorite", // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: "e2e_rules", // optional, used to locate this view in end-to-end tests
        disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
        disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        showAsAction: "ifRoom", // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        buttonColor: "blue", // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: "600" // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };

  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event: any) {
    // this is the onPress handler for the two buttons together
    if (event.type == "NavBarButtonPress") {
      // this is the event type for button presses
      if (event.id == "edit") {
        // this is the same id field from the static navigatorButtons definition
        AlertIOS.alert("NavBar", "Edit button pressed");
      }
      if (event.id == "add") {
        AlertIOS.alert("NavBar", "Add button pressed");
      }
      if (event.id == "favorite") {
        AlertIOS.alert("NavBar", "Favorite button pressed");
      }
    }
  }
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
