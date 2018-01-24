import {CREATE_BLOG} from "../actions";
import AuthService from "../client/Auth";

const Auth = new AuthService();
const initialState = {};

export function BlogReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_BLOG:
            return action.payload.data.then(
                action.callback()
        );
        default:
            return state;
    }
}