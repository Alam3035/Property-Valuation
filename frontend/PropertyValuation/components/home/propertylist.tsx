import * as React from "react";
import { Component } from "react";
import {View} from 'react-native'

import PropertyItem from './propertyitem'
import { IProperty} from '../../models/models'

interface IPropertyListProp {
    property: IProperty[];
}

export default class PropertyList extends Component <IPropertyListProp>{
    render(){
        return(
            <View>
                <PropertyItem/>

            </View>
        )
    }
}