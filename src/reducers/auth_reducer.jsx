import {SET_CURRENT_USER, GET_CURRENT_USER, GET_USER_INFO} from "../actions";
import isEmpty from 'lodash/isEmpty';
import AuthService from "../client/Auth";

const Auth = new AuthService();
const initialState = {
    isAuthenticated: false,
    user: {}
};

export function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log(action.user);
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        case GET_CURRENT_USER:
            return {
                isAuthenticated: Auth.loggedIn(),
                user: action.payload.data,
            };
        default:
            return state;
    }
}
