import axios from "axios/index";

const domain = 'http://api.stud-blog.loc';


export function asyncValidateBlog(value) {
    if (value.blog_name) {
        return axios.get(`${domain}/blog/validate/?blog_name=${value.blog_name}`).then((res) => {
            if (res.data !== true) {
                throw {blog_name: 'Назва блогу зайнята'}
            }
        });
    } else {
        return new Promise(resolve => (0))
    }
}

export function getStorage(name) {
    let matches = localStorage.getItem(name) || '[]';
    return JSON.parse(matches);
}

export function setStorage(name, item) {
    let matches = getStorage(name);
    if (!matches.includes(item)) {
        matches.push(item);
        localStorage.setItem(name, JSON.stringify(matches));
        return true;
    } else {
        return false;
    }
}


export function checkStorage(name, item) {
    let matches = getStorage(name);
    return !matches.includes(item);
}