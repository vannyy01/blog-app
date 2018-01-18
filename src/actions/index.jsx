import axios from 'axios';
import sha1 from "js-sha1";
import setAuthorizationToken from '../client/setAuthorizationToken';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const SET_CURRENT_USER = 'set_current_user';


const ROOT_URL = 'http://api.stud-blog.loc';

export function fetchPosts(parameters = 'post/?expand=author,blog&sort=-rait', FETCH = FETCH_POSTS) {
    const request = axios.get(`${ROOT_URL}/` + parameters);
    return {
        type: FETCH,
        payload: request
    };
}


export function login(values, callback = () => {
}) {
    values.password = sha1(sha1(values.password));
    console.log(values.password);
    const result = axios.post(`${ROOT_URL}/site/login`, values);
    const token = result.then(res => {
        return res.data.token
    });
    if (token) {
        localStorage.setItem('authToken', token);
        return {
            type: SET_CURRENT_USER,
            user: token
        };

    } else {
        alert(result.data.message);
    }
}
