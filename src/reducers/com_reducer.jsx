import {FETCH_COMMENTS} from "../actions";

const initialState = [];

export function CommentsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS:
            return action.payload.data;
        default:
            return state;
    }
}