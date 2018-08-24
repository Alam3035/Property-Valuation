import * as React from "react";
import { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,,
    StyleSheet,
    Picker,
    Modal

} from "react-native";

import ModalDropdown from 'react-native-modal-dropdown';


const ntoptions = ['Tuen Mun','Yuen Long','Sha Tin','Tai Po','Sai Kung','Clearwater Bay','Ma On Shan','Tseung Kwan O','Fo Tan','Sheung Shui','Tai Wai','Fan Ling','Tin Shui Wai','Tsuen Wan','Kwai Chung','Tsing Yi','Kwai Fong','Tung Chung']
const kloptions = ['Yau Tong', 'Nam Tin', 'Ngau Tau Kok', 'Kwun Tong', 'San Po Kong', 'Kowloon Bay', 'Wong Tai Sin', 'Diamond Hill', 'Kowloon City','Kowloon Tong', 'Ho Man Tin', 'Yau Yat Tsuen','Sham Shui Po', 'Shek Kip Mei','Lai Chi Kok', 'Cheung Sha Wan', 'Mei Foo', 'Lai King','Tai Kok Tsui', 'Olympic', 'Kowloon Station','Prince Edward', 'Mong Kok', 'Yau Ma Tei','Tsim Sha Tsui', 'Jordan','Hung Hom', 'Whampoa']
const hkoptions = ['Island West','Central', 'Sheung Wan' ,'Mid - Level','Wan Chai','Causeway Bay','Tin Hau', 'Tai Hang','North Point', 'Fortress Hill','Quarry Bay','TaiKoo','Sai WanHo', 'Shau Kei Wan', 'Heng Fa Chuen','Chai Wan', ',Shek O','Aberdeen','Island South']
const lantauoptions = ['Ma Wan', 'Discovery Bay','Tung Chung','South Lantau Island', 'Peng Chau', 'Tai O','Lamma Island','Cheung Chau', 'Other Islands']

export default class ModalExample extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            value: ''
    }
    
        this.onSelectedItem = this.onSelectedItem.bind(this)
        this.setModalVisible= this.setModalVisible.bind(this)
    };

    
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onSelectedItem(index,value){

        this.setState ({value:value})
        console.log(value)
    

}

    render() {
        return (
            <View>
            <TouchableHighlight>
                    <ModalDropdown style={styles.dropdown} 
                                    options={ntoptions} 
                                    defaultValue='New Territories' 
                                    textStyle={styles.buttontext} 
                                    dropdownTextStyle={styles.buttontext} 
                                    dropdownStyle={styles.listeditem}
                                    onSelect={(index,value) =>this.onSelectedItem(index,value)}
                                    
                                    />
                </TouchableHighlight>
                <TouchableHighlight>
                    <ModalDropdown style={styles.dropdown} 
                                    options={kloptions} 
                                    defaultValue='Kowloon' 
                                    textStyle={styles.buttontext} 
                                    dropdownTextStyle={styles.buttontext}
                                    dropdownStyle={styles.listeditem}
                                    onSelect={(index, value) => this.onSelectedItem(index, value)}/>
                </TouchableHighlight>
                <TouchableHighlight>
                    <ModalDropdown style={styles.dropdown} 
                                    options={hkoptions} 
                                    defaultValue='HK Island' 
                                    textStyle={styles.buttontext} 
                                    dropdownTextStyle={styles.buttontext}
                                    dropdownStyle={styles.listeditem}
                                    onSelect={(index, value) => this.onSelectedItem(index, value)}/>
                </TouchableHighlight>
                <TouchableHighlight>
                    <ModalDropdown style={styles.dropdown} 
                                    options={lantauoptions} 
                                    defaultValue='Lantau' 
                                    textStyle={styles.buttontext} 
                                    dropdownTextStyle={styles.buttontext}
                                    dropdownStyle={styles.listeditem}
                                    onSelect={(index, value) => this.onSelectedItem(index, value)}/>
                </TouchableHighlight>
                </View>           
          
        );
    }
}


const styles = StyleSheet.create({
    dropdown:{
    width: 450,
    height: 50,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor:'white'

    },
buttontext:{
    fontSize:20,
    alignSelf:'center',
    paddingTop:5,


},listeditem:{
    width: 450,
    height: 300,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
    alignItems:'center'
}
})