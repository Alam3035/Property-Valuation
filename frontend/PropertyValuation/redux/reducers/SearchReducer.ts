import { IProperty } from "../../models/models";

import { SEARCH_PROP, ISearchPropAction, SERACH_PROP } from "../actions/searchactions";

export interface IPropListState {
    propertylist: IProperty[];
}

const initialState = {
    propertylist: []
}

export function SearchReducer(state: IPropListState = initialState, action: ISearchPropAction ) {
    switch (action.type) {
        case SERACH_PROP:
            return {
                propertylist: action.property
            }
    }
    return state;
}