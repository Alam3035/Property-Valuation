import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'example.CalendarPage', // this is a registered name for a screen
      icon: require('./img/one.png'),
      title: 'Screen One'
    },
    {
      label: 'Two',
      screen: 'example.MortgageCalcPage',
      icon: require('./img/two.png'),
      title: 'Screen Two'
    }
  ]
});