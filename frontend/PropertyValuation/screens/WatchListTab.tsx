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
  Dimensions
} from "react-native";

interface IWatchListProps {}

interface IWatchListStates {
  loginMsg: string;
}

export default class WatchList extends React.Component<
  IWatchListProps,
  IWatchListStates
> {
  constructor(props: IWatchListProps) {
    super(props);

    this.state = {
      loginMsg: "Please sign up / login to use this feature!!!!!!!!!!"
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigator.showModal({
              screen: "example.auth",
              title: "Auth",
              passProps: {},
              navigatorStyle: {},
              animationType: "slide-up"
            })
          }
        >
          <Text>{this.state.loginMsg}</Text>
        </TouchableOpacity>
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
  item: {
    fontSize: 20,
    textAlign: "left",
    padding: 20,
    backgroundColor: "azure",
    width: Dimensions.get("window").width
  }
});
