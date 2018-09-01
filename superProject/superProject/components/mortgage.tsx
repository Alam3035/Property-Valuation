import React from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Header from './header';

export default class MortgageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: '',
      principal: 0,
      years: 0,
      response: '',
      completed: false
    }
    this.calculate = this.calculate.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      rate: '',
      principal: null,
      years: null,
      response: '',
      completed: false
    })
  }

  calculate() {
    function getMonths(yrs: number) {
    return yrs * 12
    }

    function convertRate(rate: number) {
      return Number(rate);
    }

    function MonthlyPayments(r, p, yrs) {
      let months = getMonths(yrs)
      let rate = convertRate(r)
      this.values = function() {
        return {months: months, rate: rate, principal: p}
      }
      this.total = function() {
        let firstTop = rate * Math.pow((1 + rate), months);
        let secondBottom = Math.pow(1 + rate, months) - 1;
        return Math.round(p * (firstTop / secondBottom));
      }
      this.message = function() {
        return `At a rate of ${rate}% with ${months} months of payments and a principal of ${p}, your monthly mortgage payment will be $${this.total()} per month`
      }
    }
    const mortgage = new MonthlyPayments(this.state.rate, this.state.principal, this.state.years);
    this.setState({
      response: mortgage.message(),
      completed: true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        {
          this.state.completed ?
          <View
            style={styles.results}
          >
            <Text style={{fontSize: 18, color: 'white'}}>{this.state.response}</Text>
          </View>
            : null
        }
        <TextInput
          keyboardType = 'numeric'
          placeholder="Rate"
          style={styles.inputs}
          value={this.state.rate}
          onChangeText={(text) => this.setState({rate: text})}
        />
        <TextInput
          keyboardType = 'numeric'
          placeholder="Principal"
          style={styles.inputs}
          value={this.state.principal}
          onChangeText={(text) => this.setState({principal: text})}
        />
        <TextInput
          keyboardType = 'numeric'
          placeholder="Years"
          style={styles.inputs}
          value={this.state.years}
          onChangeText={(text) => this.setState({years: text})}
        />
        <Button
          onPress={this.calculate}
          style={styles.button}
          title="Calculate"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.reset}
          style={styles.button}
          title="Reset"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'orange',
    height: 10,
    width: 30,
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#067EBD',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50
  },
  inputs: {
    width: 300,
    alignSelf: 'center',
    height: 40,
    margin: 10,
    padding: 5,
    backgroundColor: 'lightblue'
  },
  results: {
    width: 300,
    alignSelf: 'center',
    height: 70,
    margin: 10
  }
});