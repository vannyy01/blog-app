import { FETCH_POSTS} from "../actions";
import {FETCH_POST} from "../actions";
import _ from 'lodash';

export function PostReducer (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'post_id');
        case FETCH_POST:
            const data = action.payload.data[0];
            return { data };
        default: return state;
    }
}
