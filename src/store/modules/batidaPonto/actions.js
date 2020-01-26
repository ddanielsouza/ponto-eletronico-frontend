import axios from 'axios';
import { CHANGE_HORAS_TRABALHADAS } from '../../modules-types';
export default {
    registrarPonto({commit}, payload){
        return new Promise((resolve, reject) =>{
            axios.post('batida-ponto', payload).then(({data})=>{
                resolve(data.data, commit);
            }).catch(reject);
        })
    },
    buscarHorasTrabalhadas({commit}, payload){
        return new Promise((resolve, reject) =>{
            axios.get('batida-ponto/horas-trabalhadas', { params: payload}).then(({data})=>{
                commit(CHANGE_HORAS_TRABALHADAS, data.success ? data.data : [])
                resolve(data.data, commit);
            }).catch(reject);
        })
    },
}