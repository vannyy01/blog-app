import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const ROOT_URL = 'http://api.stud-blog.loc';
const parameters = 'expand=author,blog';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/post/?${parameters}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}