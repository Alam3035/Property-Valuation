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
  Dimensions
} from "react-native";

import { NavigationComponentProps } from "react-native-navigation";

import Icon from "react-native-vector-icons/FontAwesome";

interface Props extends NavigationComponentProps {}

// type Props = {};
export default class User extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userPanel}>
          <Icon name="user-circle" size={144} />
        </View>
        <View style={styles.userDetail} />
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
  userPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: 100,
    backgroundColor: "beige"
  },
  userDetail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: 100,
    backgroundColor: "red"
  }
});
