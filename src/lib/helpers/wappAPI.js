import axios from 'axios';
export class WAppAPI{
    request;

    constructor(token){
        this.request = axios.create({
            baseURL: 'http://127.0.0.1:3000',
            timeout: 1000 * 60,
            headers: {'Authorization': 'Bearer ' + token}
        });
    }

    login(){
        return this.request.get('/wapp/login');
    }
    enviarMensagem(param){
        return this.request.post('/wapp/send', param);
    }
}