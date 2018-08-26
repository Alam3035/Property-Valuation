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
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
  AlertIOS
} from "react-native";

import { NavigationComponentProps } from "react-native-navigation";

import styles from "../src/styles/style";
import { IUser } from "../models/models";

interface IHomeProps extends NavigationComponentProps {}
interface IHomeStates {
  loading: boolean;
  error: any;
  refreshing: boolean;
  page: number;
  seed: number;
  data: Array<IUser>;
}

// type Props = {};
export default class Home extends Component<IHomeProps, IHomeStates> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      refreshing: false,
      page: 1,
      seed: 1,
      data: []
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=10`;
    console.log("Result: " + JSON.stringify(url));

    this.setState({ loading: true });

    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data:
              page === 1 ? res.results : [...this.state.data, ...res.results],
            error: res.error || null,
            loading: false,
            refreshing: false
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }, 1500);
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={true}
        />
        <View style={styles.homePanel} />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigator.switchToTab({
                  tabIndex: 1 // Here is the tab index
                })
              }
            >
              <View style={styles.homeListItem}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: item.picture.thumbnail
                  }}
                />
                <Text style={styles.item}>
                  Name: {`${item.name.first} ${item.name.last}`}
                  {"\n"}
                  Email: {item.email}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </View>
    );
  }
}
