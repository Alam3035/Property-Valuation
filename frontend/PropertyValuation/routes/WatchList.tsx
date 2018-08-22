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
  FlatList,
  Dimensions,
  Slider
} from "react-native";

import { NavigationComponentProps } from "react-native-navigation";

interface Props extends NavigationComponentProps {}

// type Props = {};
export default class WatchList extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            { key: "Devin" },
            { key: "Jackson" },
            { key: "James" },
            { key: "Joel" },
            { key: "John" },
            { key: "Jillian" },
            { key: "Jimmy" }
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.key}
              onPress={() =>
                this.props.navigator.switchToTab({
                  tabIndex: 1 // Here is the tab index
                })
              }
            >
              <Text key={item.key} style={styles.item}>
                {item.key}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Slider
          style={{
            width: Dimensions.get("window").width * 0.8,
            padding: 40
          }}
          maximumValue={100}
          minimumValue={0}
        />
        <Slider
          style={{
            width: Dimensions.get("window").width * 0.8,
            padding: 40
          }}
          maximumValue={100}
          minimumValue={0}
        />
        <Slider
          style={{
            width: Dimensions.get("window").width * 0.8,
            padding: 40
          }}
          maximumValue={100}
          minimumValue={0}
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
  item: {
    fontSize: 20,
    textAlign: "left",
    padding: 20,
    backgroundColor: "azure",
    width: Dimensions.get("window").width
  }
});
