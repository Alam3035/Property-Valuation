import axios from 'axios';
import {Dispatch} from "redux";
import { IProperty } from '../../models/models'
import Config from 'react-native-config'


export const SERACH_PROP ='SEARCH_PROP';
export type SEARCH_PROP =typeof SERACH_PROP

export interface ISearchPropAction {
    type:SEARCH_PROP;
    property:IProperty[];
}

//noraml action creator
export function SearchPropertyAction(property: IProperty[]): ISearchPropAction {
   return {
    property,
    type: SERACH_PROP,
   }
}

//thunk action creator

export function SearchPropFromAPIAction(search:string){
    return (dispatch:Dispatch) =>{
        axios.get(`${Config.API_URL}/district?search=${search}`)
            .then(res => {
                dispatch(SearchPropertyAction(res.data));
            })
    }
}