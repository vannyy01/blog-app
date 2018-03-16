import {CREATE_BLOG, FETCH_BLOGS} from "../actions";

const initialState = [];

export function BlogReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BLOGS:
            return {...state, blogs: action.payload.data};
        case CREATE_BLOG:
            return action.payload.data.then(
                action.callback()
            );
        default:
            return state;
    }
}