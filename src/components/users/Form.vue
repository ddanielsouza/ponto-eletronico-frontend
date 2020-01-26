<template>
    <Form :model="user" :rules="rules" ref="form">
        <row>
            <i-col :sm="24">
                <FormItem label="Nome" prop="name">
                    <i-input v-model="user.name"/>
                </FormItem>
            </i-col>
        </row>
        <row>
            <i-col :sm="24">
                <FormItem label="Telefone" prop="telefone">
                    <i-input v-model="user.telefone"/>
                </FormItem>
            </i-col>
        </row>
        <row>
            <i-col :sm="24">
                <FormItem label="E-mail" prop="email">
                    <i-input v-model="user.email" type="email"/>
                </FormItem>
            </i-col>
        </row>
        <row>
            <i-col :sm="24">
                <FormItem label="Senha" prop="password">
                    <i-input v-model="user.password" type="password"/>
                </FormItem>
            </i-col>
        </row>
        <row>
            <i-col :sm="24">
                <FormItem label="Privilégio" prop="privilegio_id">
                    <Select  v-model="user.privilegio_id" style="width:100%">
                        <Option :value="1"> Super Admin</Option>
                        <Option :value="2"> Funcionário</Option>
                    </Select>
                </FormItem>
            </i-col>
        </row>
        <row>
            <i-col :sm="24">
                <Button long type="success" @click="salvar">Salvar</Button>
            </i-col>
        </row>
    </Form>
</template>

<script>
import { getMSG, msgs } from '../../lib/helpers/msg';
export default {
    props: ['value'],
    data(){
        return{
            user: {},
            rules: {
                email: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Email'), trigger: 'blur', type:"string"}],
                name: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Nome'), trigger: 'blur', type:"string"}],
                telefone: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Telefone'), trigger: 'blur', type:"string"}],
                password: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Senha'), trigger: 'blur', type:"string"}],
                privilegio_id: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Privilégio'), trigger: 'blur', type:"number"}],
            }
        }
    },
    watch: {
        user(newValue){
            this.$emit('input', newValue);
            this.$emit('change', newValue);
        },
        value(newValue){
           this.user = newValue; 
        }
    },
    methods:{
        salvar(){
            this.$refs['form'].validate(valid =>{
                if(valid){
                    this.$emit('salvar', this.user);
                }
            })
        }
    },
    created(){
        this.user = this.value; 
    }
}
</script>

<style scoped>

</style>