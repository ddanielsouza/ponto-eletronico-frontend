import axios from 'axios';
import { CHANGE_USERS } from '../../modules-types';

export default {
    getUsers({commit}){
        return new Promise((resolve, reject) =>{
            axios.get('users').then(({data})=>{
                commit(CHANGE_USERS, data.success ? data.data : []);
                resolve(data.data);
            }).catch(reject);
        })
    },
    registerUser({commit}, payload){
        return new Promise((resolve, reject) =>{
            axios.post('users', payload).then(({data})=>{
                resolve(data.data, commit);
            }).catch(reject);
        })
    },
    updateUser({commit}, payload){
        return new Promise((resolve, reject) =>{
            axios.put(`users/${payload.id}`, payload).then(({data})=>{
                resolve(data.data, commit);
            }).catch(reject);
        })
    }
}