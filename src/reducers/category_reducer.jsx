import {FETCH_CATEGORY, } from "../actions";

export function CategoryReducer(state = [], action) {
    switch (action.type) {
        case FETCH_CATEGORY:
            return action.payload.data;
        default:
            return state;
    }
}