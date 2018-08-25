// Auth Page
import * as React from "react";
import { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
  Modal
} from "react-native";

import { NavigationComponentProps } from "react-native-navigation";
import styles from "../../src/styles/style";

// interface IAuthProps {}

// interface IAuthStates {
//   modalVisible: boolean;
// }

export default class Auth extends Component {
  //   constructor(props: IAuthProps) {
  //     super(props);
  //   }

  //   setModalVisible(visible: boolean) {
  //     this.setState({ modalVisible: visible });
  //   }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          transparent={false}
          //   visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <Text style={styles.welcome}>Welcome to Property Valuation!</Text>
          <Text style={styles.instructions}>Please register!</Text>

          {/* Continue without registration */}
          {/* <TouchableOpacity
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          > */}
          {/* <Text>Continue without registration</Text> */}
          {/* </TouchableOpacity> */}

          {/* Login / Sign Up */}
        </Modal>
      </View>
    );
  }
}
