import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';

const ROOT_URL = 'http://api.stud-blog.loc';

export function fetchPosts(parameters = 'post/?expand=author,blog&sort=-rait', FETCH = FETCH_POSTS) {
    const request = axios.get(`${ROOT_URL}/`+parameters);

    return {
        type: FETCH,
        payload: request
    };
}