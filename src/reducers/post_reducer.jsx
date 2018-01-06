import { FETCH_POSTS} from "../actions";
import _ from 'lodash';

export function PostReducer (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'post_id');
        default: return state;
    }
}
