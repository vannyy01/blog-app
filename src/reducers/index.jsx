import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import {PostReducer} from './post_reducer';
import {LoginReducer} from "./auth_reducer";
import {UserReducer} from "./user_reducer";
import {BlogReducer} from "./blog_reducer";

const rootReducer = combineReducers({
    post: PostReducer,
    form: FormReducer,
    login: LoginReducer,
    user: UserReducer,
    blog: BlogReducer,
});

export default rootReducer;
