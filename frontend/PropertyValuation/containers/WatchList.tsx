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
  Dimensions,
  Image
} from "react-native";
import { NavigationComponentProps } from "react-native-navigation";
// import { connect } from "react-redux";
// import { Dispatch } from "redux";
// import {
//   ILoginActions,
//   logInUser,
//   logOutUser
// } from "../components/auth/action";
// import { IRootState } from "../redux/store";
// import { IAuthUser } from "../models/models";

interface IWatchListProps {
  // loginIn: (auth: IAuthUser) => void;
  // auth: IAuthUser;
}

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
        {/* <TouchableOpacity
          onPress={() =>
            this.props.navigator.showModal({
              screen: "example.auth", // unique ID registered with Navigation.registerScreen
              title: "Auth", // title of the screen as appears in the nav bar (optional)
              passProps: {}, // simple serializable object that will pass as props to the modal (optional)
              navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
              animationType: "slide-up" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            })
          }
        > */}
        <TouchableOpacity onPress={this.loginYouIn}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../src/icons/IC-Add-Circle-24px.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.loginYouOut}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../src/icons/IC-Remove-Circle-Outline-24px.png")}
          />
        </TouchableOpacity>
        <Text>{this.state.loginMsg}</Text>
      </View>
    );
  }

  private loginYouIn = () => {
    // Do something
    this.setState({
      loginMsg: "Yes, you are now login"
    });
  };

  private loginYouOut = () => {
    // Do something
    this.setState({
      loginMsg: "Please sign up / login to use this feature!!!!!!!!!!"
    });
  };

  // private loginYouIn = () => {
  //   this.props.loginIn(this.props.auth);
  // };
}

// const mapStateToProps = (state: IRootState) => {
//   return {
//     // links: state.links.linkList
//     auth: {
//       login: {
//         username: "string",
//         email: "string",
//         password: "string",
//         isLoggedIn: true,
//         isLoggingIn: true
//       }
//     }
//   };
// };

// const mapDispatchToProps = (dispatch: Dispatch<ILoginActions>) => {
//   return {
//     loginIn: (auth: IAuthUser) => {
//       dispatch(logInUser(auth));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WatchList);

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
