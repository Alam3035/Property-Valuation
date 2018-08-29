import * as React from "react";
import { Component } from "react";
import {
        Text,
        View,
        StyleSheet,
        TextInput,
        Button,
        ActivityIndicator
} from "react-native";
import homeStyles from '../../src/styles/style'


interface ISearchProp{
    onSearchChange: (search: string) => void;
}

interface ISearchState{
    search:string
    isLoading:boolean,

}

export default class SearchBar extends Component<ISearchProp,ISearchState>{
    constructor(props){
        super(props);
        this.state={
            search: 'Which district are you interested in? ',
            isLoading:false
        }
    }
    onSearchTextChange = (event) => {
        const searchValue = event.nativeEvent.text
        this.setState({ search: searchValue });

        this.props.onSearchChange(event.currentTarget.value);
    }

    onSearchPressed = () => {
        //const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        const search = this.state.search
        this.setState({ isLoading: true });
    };

    public render(){
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large' /> : null;
        return (
            <View style={homeStyles.searchbar}>
                <TextInput
                    style={homeStyles.searchinput}
                    value={this.state.search}
                    onChange={this.onSearchTextChange}
                />
                <Button title='go' onPress={this.onSearchPressed}></Button>
            {spinner}
            </View>
          
        )

    }

}

