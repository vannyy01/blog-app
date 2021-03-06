import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import {PostReducer} from './post_reducer';
import {LoginReducer} from "./auth_reducer";
import {UserReducer} from "./user_reducer";
import {BlogReducer} from "./blog_reducer";
import {CategoryReducer} from "./category_reducer";
import {CommentsReducer} from "./com_reducer";
import {ListReducer} from "./list_reducer";
import {ArticleReducer} from "./article_reducer";

const rootReducer = combineReducers({
    post: PostReducer,
    form: FormReducer,
    login: LoginReducer,
    user: UserReducer,
    blog: BlogReducer,
    category: CategoryReducer,
    comments: CommentsReducer,
    list: ListReducer,
    article: ArticleReducer
});

export default rootReducer;
