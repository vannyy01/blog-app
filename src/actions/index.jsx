import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const FETCH_TAGS = 'fetch_tags';
export const FETCH_BLOGS = 'fetch_blogs';
export const FETCH_COMMENTS = 'fetch_comments';
export const FETCH_CATEGORY = 'fetch_category';
export const SET_CURRENT_USER = 'set_current_user';
export const GET_CURRENT_USER = 'get_current_user';
export const GET_USER_INFO = 'get_current_user_info';
export const UPDATE_USER_INFO = 'update_user_info';
export const CREATE_BLOG = 'create_blog';
export const CREATE_POST = 'create_post';
export const CREATE_COMMENT = 'create comment';
export const LIKE_COMMENT = 'like comment';
export const DISLIKE_COMMENT = 'dislike comment';

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

export function updateUserInfo(values) {
    const user = axios.patch(`${ROOT_URL}/profile/update`, values);
    return {
        type: UPDATE_USER_INFO,
        payload: user
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
    const tags = axios.get(`${ROOT_URL}/post/tags/?tag=${values}`);

    return {
        type: FETCH_TAGS,
        payload: tags,
    }
}

export function fetchComments(post_id) {
    const comments = axios.get(`${ROOT_URL}/comment/comments/?post_id=${post_id}`);

    return {
        type: FETCH_COMMENTS,
        payload: comments,
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