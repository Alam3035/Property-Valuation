/** @format */

// import { AppRegistry } from "react-native";
import App from "./App";
import Home from "./routes/Home";
import Valuation from "./routes/Valuation";
import WatchList from "./routes/WatchList";
import User from "./routes/User";

// import { name as appName } from "./app.json";

// AppRegistry.registerComponent(appName, () => App);

import { Navigation } from "react-native-navigation";

// Navigation.registerComponent("example.WelcomeScreen", () => App);
Navigation.registerComponent("example.home", () => Home);
Navigation.registerComponent("example.valuation", () => Valuation);
Navigation.registerComponent("example.watchlist", () => WatchList);
Navigation.registerComponent("example.user", () => User);

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
  passProps: {},
  animationType: "slide-down"
});
