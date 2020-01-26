<template>
    <Form :model="filtro" :rules="rules" ref="form">
        <row :gutter="20">
            <i-col :sm="12">
                <FormItem label="Data Inicio" prop="password">
                    <DatePicker 
                        v-model="filtro.dataInicio" 
                        format="dd/MM/yyyy"
                        type="date" 
                        style="width: 100%">
                    </DatePicker>
                </FormItem>
            </i-col>
            <i-col :sm="12">
                <FormItem label="Data Fim" prop="password">
                    <DatePicker 
                        v-model="filtro.dataFim" 
                        format="dd/MM/yyyy"
                        type="date" 
                        style="width: 100%">
                    </DatePicker>
                </FormItem>
            </i-col>
        </row>
        <row :gutter="20">
            <i-col :sm="12">
                <FormItem/>
            </i-col>
            <i-col :sm="12">
                <Button type="success" @click="filtrar" long>Filtrar</Button>
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
            filtro: {},
            rules: {
                dataInicio: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Email'), trigger: 'blur', type:"date"}],
                dataFim: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Nome'), trigger: 'blur', type:"date"}],
            }
        }
    },
    watch: {
        filtro(newValue){
            this.$emit('input', newValue);
            this.$emit('change', newValue);
        },
        value(newValue){
           this.filtro = newValue; 
        }
    },
    methods:{
        filtrar(){
            this.$refs['form'].validate(valid =>{
                if(valid){
                    this.$emit('filtrar', this.filtro);
                }
            })
        }
    },
    created(){
        this.filtro = this.value; 
    }
}
</script>