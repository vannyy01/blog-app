import {FETCH_POST} from "../actions";

const initialState = [];

export function ArticleReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POST:
            return action.payload.data[0];
        default:
            return state;
    }
}
