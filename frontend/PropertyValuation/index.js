/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { Navigation } from "react-native-navigation";
import { registerScreens } from "./screens";
registerScreens(); // this is where you register all of your app's screens

Navigation.startTabBasedApp({
  tabs: [
    {
      label: "Home",
      screen: "example.home",
      icon: require("./src/icons/IC-Home-24px.png"),
      title: "Home"
    },
    {
      label: "Valuation",
      screen: "example.valuation",
      icon: require("./src/icons/IC-Attach-Money-24px.png"),
      title: "Valuation"
    },
    {
      label: "WatchList",
      screen: "example.watchlist",
      icon: require("./src/icons/IC-Remove-Red-Eye-24px.png"),
      title: "WatchList"
    },
    {
      label: "User",
      screen: "example.user",
      icon: require("./src/icons/IC-Verified-User-24px.png"),
      title: "User"
    }
  ],
  tabsStyle: {
    tabBarButtonColor: "#ffff00",
    tabBarSelectedButtonColor: "#ff9900",
    tabBarBackgroundColor: "#551A8B",
    initialTabIndex: 0
  },
  appStyle: {
    orientation: "portrait",
    bottomTabBadgeTextColor: "red",
    bottomTabBadgeBackgroundColor: "green",
    backButtonImage: require("./src/icons/IC-Account-Circle-18px.png")
  },
  passProps: {},
  animationType: "slide-down"
});