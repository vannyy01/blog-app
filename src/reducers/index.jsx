import {combineReducers} from 'redux';
import {PostReducer} from './post_reducer';

const rootReducer = combineReducers({
    post: PostReducer
});

export default rootReducer;
