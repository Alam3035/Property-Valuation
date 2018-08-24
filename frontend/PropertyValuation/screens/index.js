// import { Navigation } from "react-native-navigation";

// import App from "../App";

// // register all screens of the app (including internal ones)
// export function registerScreens() {
//   Navigation.registerComponent("example.FirstTabScreen", () => App);
//   Navigation.registerComponent("example.SecondTabScreen", () => App);
// }

import { Navigation } from "react-native-navigation";

import App from "../App";
import Auth from "../containers/Auth";
import Home from "../containers/Home";
import Valuation from "../containers/Valuation";
import WatchList from "../containers/WatchList";
import User from "../containers/User";

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent("example.app", () => App);
  Navigation.registerComponent("example.auth", () => Auth);
  Navigation.registerComponent("example.home", () => Home);
  Navigation.registerComponent("example.valuation", () => Valuation);
  Navigation.registerComponent("example.watchlist", () => WatchList);
  Navigation.registerComponent("example.user", () => User);
}
