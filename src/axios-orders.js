import axios from 'axios';
const instance = axios.create({
    baseURL:'https://burgerbuilder-94b52-default-rtdb.firebaseio.com/'
});

export default instance;