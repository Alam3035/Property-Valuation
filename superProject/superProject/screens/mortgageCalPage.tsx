import React from 'react'
import { Component } from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native';
import MortgageInput from '../components/mortgage';


type Props = {};
export default class MortgageCalcPage extends React.Component <Props> {
    render() {
        return (
            <View style={styles.container} >
            <MortgageInput />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
})