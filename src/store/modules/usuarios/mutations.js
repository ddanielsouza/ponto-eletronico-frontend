import { CHANGE_USERS } from "../../modules-types";

export default {
    [CHANGE_USERS](state, payload){
        state.users = payload;
    }
}