/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// AppRegistry.registerComponent(appName, () => App);

import { Navigation } from "react-native-navigation";

import App from "./App";
import Home from "./screens/HomeTab";
import Valuation from "./screens/ValuationTab";
import WatchList from "./screens/WatchListTab";
import User from "./screens/UserTab";
import Auth from "./screens/Auth";
import LoginPage from "./components/auth/loginPage";
import SignUpPage from "./components/auth/signUpPage";


Navigation.registerComponent("example.app", () => App);
Navigation.registerComponent("example.home", () => Home);
Navigation.registerComponent("example.valuation", () => Valuation);
Navigation.registerComponent("example.watchlist", () => WatchList);
Navigation.registerComponent("example.user", () => User);
Navigation.registerComponent("example.auth", () => Auth);
Navigation.registerComponent("example.loginPage", () => LoginPage);
Navigation.registerComponent("example.signUpPage", () => SignUpPage);


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
