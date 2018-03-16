import axios from 'axios';
import {getStorage, setStorage} from "./validation";

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_LIKES_POSTS = 'fetch_likes_posts';
export const FETCH_POST = 'fetch_post';
export const FETCH_TAGS = 'fetch_tags';
export const FETCH_BLOGS = 'fetch_blogs';
export const FETCH_COMMENTS = 'fetch_comments';
export const FETCH_CATEGORY = 'fetch_category';
export const FETCH_BLOG_LIST = 'fetch_blog_list';
export const FETCH_BLOG_POSTS = 'fetch_blog_posts';
export const SET_CURRENT_USER = 'set_current_user';
export const GET_CURRENT_USER = 'get_current_user';
export const GET_USER_INFO = 'get_current_user_info';
export const UPDATE_USER_INFO = 'update_user_info';
export const CREATE_BLOG = 'create_blog';
export const CREATE_POST = 'create_post';
export const CREATE_COMMENT = 'create comment';
export const LIKE_POST = 'like_post';
export const DISLIKE_POST = 'dislike_post';
export const LIKE_COMMENT = 'like comment';
export const DISLIKE_COMMENT = 'dislike comment';
export const FILE_UPLOAD = 'file_upload';
const ROOT_URL = 'http://api.stud-blog.loc';

export function fetchPosts(parameters = 'post/?expand=author,blog,avatar&sort=-rait', FETCH = FETCH_POSTS) {
    const request = axios.get(`${ROOT_URL}/` + parameters);
    return {
        type: FETCH,
        payload: request
    };
}

export function fetchLikesPosts(parameters = 0, post_name) {
    const likes = getStorage("FavouritesPosts");
    let param;
    if (parameters === 0) {
        param = `post/likes?likes=${JSON.stringify(likes)}`;
    } else if (parameters === 1) {
        param = `post/likes?likes=${JSON.stringify(likes)}&post_name=${post_name}`;
    }
    const request = axios.get(`${ROOT_URL}/${param}`);

    return {
        type: FETCH_LIKES_POSTS,
        payload: request
    };
}

export function fetchBlogPosts(blog_id = '', parameters = 0, post_name) {
    let param;
    if (parameters === 0) {
        param = `post/?s[blog_id]=${blog_id}&expand=author,blog,avatar&sort=-rait`;
    } else if (parameters === 1) {
        param = `post/?s[blog_id]=${blog_id}&s[post_name]=${post_name}&expand=author,blog&sort=-rait`;
    }
    const request = axios.get(`${ROOT_URL}/${param}`);
    return {
        type: FETCH_BLOG_POSTS,
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


export function updateUserInfo(values) {
    const user = axios.patch(`${ROOT_URL}/profile/update`, values);
    return {
        type: UPDATE_USER_INFO,
        payload: user
    }
}

export function likePost(id) {
    const request = axios.put(`${ROOT_URL}/post/increment`, id);
    return {
        type: LIKE_POST,
        payload: request
    }
}

export function dislikePost(id) {
    const request = axios.put(`${ROOT_URL}/post/decrement`, id);
    return {
        type: DISLIKE_POST,
        payload: request
    }
}

export function likeComment(id) {
    const request = axios.put(`${ROOT_URL}/comment/increment`, id);
    return {
        type: LIKE_COMMENT,
        payload: request
    }
}

export function dislikeComment(id) {
    const request = axios.put(`${ROOT_URL}/comment/decrement`, id);
    return {
        type: DISLIKE_COMMENT,
        payload: request
    }
}

export function fileUpload(file) {
    const url = `${ROOT_URL}/profile/avatar_update`;
    const formData = new FormData();
    formData.append('file', file, 'uploadImage');
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const request = axios.post(url, formData, config);
    return {
        type: FILE_UPLOAD,
        payload: request
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


export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/post/create`, values)
        .then(res => {
            alert("Ви успішно створили допис");
            callback();
        }).catch(err =>
            alert("Error" + err));

    return {
        type: CREATE_POST,
        payload: request
    };

}

export function createComment(values, callback) {
    const request = axios.post(`${ROOT_URL}/comment/create`, values)
        .then(res => {
            callback();
        }).catch(err =>
            alert("Error" + err));

    return {
        type: CREATE_COMMENT,
        payload: request
    };

}

export function fetchTags(values) {
    values = JSON.stringify(values);
    const tags = axios.get(`${ROOT_URL}/post/tags/?tag=${values}`);

    return {
        type: FETCH_TAGS,
        payload: tags,
    }
}

/**
 *
 * @param post_id
 * @returns {{type: string, payload: AxiosPromise}}
 */
export function fetchComments(post_id) {
    const comments = axios.get(`${ROOT_URL}/comment/?post_id=${post_id}`);

    return {
        type: FETCH_COMMENTS,
        payload: comments,
    }
}

/**
 *
 * @param blog_name
 * @returns {{type: string, payload: AxiosPromise}}
 */
export function fetchBlogList(blog_name = '') {
    const blogs = axios.get(`${ROOT_URL}/blog/?s[blog_name]=${blog_name}&expand=short_description,avatar,author&sort=blog_name`);

    return {
        type: FETCH_BLOG_LIST,
        payload: blogs,
    }
}


export function fetchBlogs() {
    const blogs = axios.get(`${ROOT_URL}/blog/blogs`);

    return {
        type: FETCH_BLOGS,
        payload: blogs,
    }
}

export function fetchCategory($category) {
    const category = axios.get(`${ROOT_URL}/post/category/?category=${$category}`);

    return {
        type: FETCH_CATEGORY,
        payload: category,
    }
}