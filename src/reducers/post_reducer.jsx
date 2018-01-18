import {FETCH_POSTS} from "../actions";
import {FETCH_POST} from "../actions";
import _ from 'lodash';

const initialState = [{
    post_id: 1,
    post_name: '' ,
    short_description: '',
    rait: 0,
    author: {
        id: 0 ,
        name: ''
    },
    blog: {
        id: 0,
        name: ''
    },
    created_at: '' ,
    category: [0],
}];

export function PostReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return !action.payload.data ? {... state}
                : action.payload.data;
        case FETCH_POST:
            const data = action.payload.data[0];
            return {data};
        default:
            return state;
    }
}
