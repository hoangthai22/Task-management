import axios from 'axios';
import { API_ENDPOINT } from "./../constants";


export default function callApi(endpoint, method = 'GET', body) {
    
    return axios({
        method: method,
        url: `${API_ENDPOINT}/${endpoint}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: body
    })

}