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
};