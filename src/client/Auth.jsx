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

    signUp(values, callback) {
        delete values.confirmPassword;
        return axios.post(`${this.domain}/profile/create`, values)
            .then(this._checkStatus).then(res => {
                alert('Вітаємо, Ви успішно Зареєстровані!');
                callback();
            }).catch(err => {
                alert('Помилка реєстрації');
            });
    }

    checkUserStatusOnServer = () => {
        return axios.get(`${this.domain}/site/active`)
    };

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        const date = parseInt(this.getAuthDate());
        if (date > new Date().getTime()) {
            return !_.isEmpty(token) && token !== undefined && token.length === 32; // handwaiving here
        } else {
            this.logout();
            return false;
        }
    }


    /**
     *
     * @param value is nickname or email
     */
    asyncValidate(value) {
        if (value.email) {
            return axios.get(`${this.domain}/profile/validate/?email=${value.email}`).then((res) => {
                if (res.data !== true) {
                    throw {email: 'That email is taken'}
                }
            });
        } else if (value.user_name) {
            return axios.get(`${this.domain}/profile/validate/?username=${value.nickname}`).then((res) => {
                if (res.data !== true) {
                    throw {user_name: 'That nickname is taken'}
                }
            });
        } else {
            return new Promise(resolve => (0))
        }
    }

    setToken(idToken) {

        // Saves user token to localStorage
        const date = new Date().getTime() + 1000 * 60 * 60 *24;
        localStorage.setItem('AuthTOken', idToken);
        localStorage.setItem('AuthDate', date.toString());
    }

    getAuthDate() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('AuthDate')
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('AuthTOken')
    }

    logout(callback = () => {
    }) {
        // Clear user token and profile data from localStorage
        callback();
        localStorage.removeItem('AuthTOken');
        delete axios.defaults.headers.common['Authorization'];
    }


    axios(url, options) {
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken()}`;
        }

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