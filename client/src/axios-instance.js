import axios from 'axios';

let apiPath = 'https://sw-address-book-server.herokuapp.com/api/';
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    apiPath = '/api/';
}

const instance = axios.create({
    baseURL: apiPath
});

export default instance;