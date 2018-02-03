import {CREATE_BLOG, FETCH_BLOGS} from "../actions";
import AuthService from "../client/Auth";

const Auth = new AuthService();
const initialState = [];

export function BlogReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BLOGS:
            return action.payload.data;
        case CREATE_BLOG:
            return action.payload.data.then(
                action.callback()
        );
        default:
            return state;
    }
}