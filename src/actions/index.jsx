import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const SET_CURRENT_USER = 'set_current_user';
export const GET_CURRENT_USER = 'get_current_user';
export const GET_USER_INFO = 'get_current_user_info';
export const UPDATE_USER_INFO = 'update_user_info';
export const CREATE_BLOG = 'create_blog';

const ROOT_URL = 'http://api.stud-blog.loc';

export function fetchPosts(parameters = 'post/?expand=author,blog&sort=-rait', FETCH = FETCH_POSTS) {
    const request = axios.get(`${ROOT_URL}/` + parameters);
    return {
        type: FETCH,
        payload: request
    };
}

export function fetchUser(token) {
    const user = axios.get(`${ROOT_URL}/profile/user?token=${token}`);

    return {
        type: GET_CURRENT_USER,
        payload: user
    }
}

export function fetchUserInfo(token) {
    const user = axios.get(`${ROOT_URL}/profile/user?token=${token}&
    expand=email,info`);

    return {
        type: GET_USER_INFO,
        payload: user
    }
}

export function updateUserInfo(values){
    const user = axios.patch(`${ROOT_URL}/profile/update`, values);
    return {
        type: UPDATE_USER_INFO,
        payload: user
    }
}

export function createBlog(values, callback) {
    const blog = axios.post(`${ROOT_URL}/blog/create`, values);

    return {
        type: CREATE_BLOG,
        payload: blog,
        callback: callback()
    }
}