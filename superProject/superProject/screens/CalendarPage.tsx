import React from 'react'
import { Component } from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native';
import Calander from '../components/calander';


type Props = {};
export default class calendarPage extends React.Component <Props> {
    render() {
        return (
            <View style={styles.container} >
            <Calander />
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