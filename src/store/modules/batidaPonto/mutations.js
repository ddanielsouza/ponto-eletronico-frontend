import { CHANGE_HORAS_TRABALHADAS } from "../../modules-types";

export default {
    [CHANGE_HORAS_TRABALHADAS](state, payload){
        state.horasTrabalhadas = payload
    }
}