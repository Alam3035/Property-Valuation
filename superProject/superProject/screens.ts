import { Navigation } from 'react-native-navigation';

import MortgageCalPage from './screens/MortgageCalPage';
import CalendarPage from './screens/CalendarPage';
// import PushedScreen from './PushedScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.MortgageCalPage', () => MortgageCalPage);
  Navigation.registerComponent('example.CalendarPage', () => CalendarPage);
//   Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
}