import axios from 'axios';


const service = new axios.create({
    baseURL: '149.154.167.40:443',
    timeout: 5000,
})

service.interceptors.request.use( config => {return config}, error => { return Promise.reject(error) } )
service.interceptors.response.use( response => {return config}, error => { return Promise.reject(error) } )

export default service;