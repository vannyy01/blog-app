import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import {PostReducer} from './post_reducer';
import {LoginReducer} from "./auth_reducer";

const rootReducer = combineReducers({
    post: PostReducer,
    form: FormReducer,
    login: LoginReducer
});

export default rootReducer;
