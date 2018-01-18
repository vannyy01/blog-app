import axios from 'axios';
import sha1 from "js-sha1";
import _ from 'lodash';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://api.stud-blog.loc'; // API server domain
        this.axios = this.axios.bind(this); // React binding stuff
        this.login = this.login.bind(this);
    }

    login(values) {
        // Get a token from api server using the fetch api
        values.password = sha1(sha1(values.password));
        return this.axios(`${this.domain}/site/login`, {
                method: 'POST',
                params: values
            }
        ).then(res => {
            this.setToken(res.data.token); // Setting the token in localStorage
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getToken();
            return Promise.resolve(res);
        }).catch(err => {
            alert('Перевірте логін та пароль');
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        return !_.isEmpty(token) && token !== undefined && token.length === 32; // handwaiving here
    }


    setToken(idToken) {

        // Saves user token to localStorage
        localStorage.setItem('AuthTOken', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('AuthTOken')
    }

    logout(callback) {
        // Clear user token and profile data from localStorage
        callback();
        localStorage.removeItem('AuthTOken');
        delete axios.defaults.headers.common['Authorization'];
    }


    axios(url, options) {
        // performs api calls sending the required authentication headers

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken()}`;
        }
        /**return axios({
            method: options.method,
            headers: {
                'Content-Type': 'application/json; charset= UTF-8',
            },
            url: url,
            data: JSON.stringify(options.params)
        })
         .then(this._checkStatus)**/

        return axios.post(`${this.domain}/site/login`,
            options.params
        ).then(this._checkStatus)
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }
}