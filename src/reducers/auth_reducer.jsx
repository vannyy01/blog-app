import {SET_CURRENT_USER} from "../actions";
import isEmpty from 'lodash/isEmpty';
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
        default:
            return state;
    }
}
