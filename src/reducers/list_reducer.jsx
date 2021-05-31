import {FETCH_BLOG_LIST, FETCH_BLOG_POSTS, FETCH_LIKES_POSTS, FETCH_TAGS} from "../actions";

const initialState = [];

export function ListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BLOG_LIST:
            return action.payload.data || state;
        case FETCH_BLOG_POSTS:
            return action.payload.data || state;
        case FETCH_LIKES_POSTS:
            return action.payload.data || state;
        case FETCH_TAGS:
            return action.payload.data;
        default:
            return state;
    }
}