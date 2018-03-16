import {FETCH_POSTS, FETCH_TAGS, FETCH_CATEGORY, CREATE_POST, FETCH_LIKES_POSTS} from "../actions";
import {FETCH_POST} from "../actions";
import _ from 'lodash';

const initialState = [];

export function PostReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return !action.payload.data ? {...state}
                : action.payload.data;
        case FETCH_POST:
            return action.payload.data[0];
        case FETCH_CATEGORY:
            return action.payload.data;

        default:
            return state;
    }
}
