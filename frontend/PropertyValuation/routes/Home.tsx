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
  TextInput,
  Button
} from "react-native";

import { NavigationComponentProps } from "react-native-navigation";
import ModalExample from '../components/home/districtbotton'

import styles from "../src/styles/style";

interface IHomeProps extends NavigationComponentProps {}
interface IHomeStates {
  loading: boolean;
  error: any;
  refreshing: boolean;
  page: number;
  seed: number;
  searchString:string;
  data: Array<{
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: string;
      city: string;
      state: string;
      postcode: Number;
      coordinates: {
        latitude: string;
        longitude: string;
      };
      timezone: {
        offset: string;
        description: string;
      };
    };
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    dob: {
      date: string;
      age: 23;
    };
    registered: {
      date: string;
      age: 8;
    };
    phone: string;
    cell: string;
    id: {
      name: string;
      value: string;
    };
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  }>;
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
      data: [],
      searchString: 'Which district/estate are you interested in?'
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

  onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString)

  }

  render() {
    return (
     
        <View style={styles.container}>
          <View style={styles.districtbox}>
            <TextInput
              underlineColorAndroid={'transparent'}
              style={styles.searchInput}
              value={this.state.searchString}
              onChange={this.onSearchTextChanged} />
            <Button
              onPress={() => { }}
              color='#48BBEC'
              title='Go'
            />
          </View>
          
        <ModalExample></ModalExample>
        
          
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
