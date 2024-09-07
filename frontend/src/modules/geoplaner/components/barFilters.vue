<template>
    <div>
        <ul class="list-none pl-0 mt-0 w-52">
            <li class="flex items-center mb-2 font-bold text-base">Busca el distrito</li>

            <li class="mt-4 ">
                <Autocomplete @update:modelValue="eventDepartament" class="w-52" :options="departamento_list"
                    v-model="departamento_value" placeholder="Departamento" @change="eventChange" />
            </li>
            <li class="mt-2 " v-if="departamento_value">
                <Autocomplete @update:modelValue="eventProvince" class="w-52" :options="provincia_list"
                    v-model="provincia_value" placeholder="Provincia" />
            </li>
            <li class="mt-2 " v-if="provincia_value">
                <Autocomplete @update:modelValue="eventDistrict" class="w-52" :options="distrito_list"
                    v-model="distrito_value" placeholder="Distrito" />
            </li>

        </ul>
        <ul class="list-none pl-0 mt-0 w-52">
            <li class="flex mb-4 items-center mt-8 font-bold text-base">Historial</li>

            <li v-for="item in storeM.historyEditPolygon" :key="item.name" class="leading-[8px] mt-3 text-base text-gray-700">
                <FeatherIcon name="clock" class="h-4 w-4 inline-block text-blue-500" /> 
                {{moment(item.date) }} <span class="text-[10px] pl-5 text-gray-500">{{ item.owner }}</span>
            </li>


        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import { formatNumber, latLng } from '../utils/tools'
import { Dropdown, Input, Autocomplete } from 'frappe-ui'
import { mapaStore } from '../data/mapaStore'
import { filterStore } from '../data/filterStore'

export default {
    data() {
        return {
            pathService: 'https://newwebservices.shalomcontrol.com/api/v1/ubigeo',
            departamento_list: {},
            departamento_value: '',
            provincia_list: {},
            provincia_value: '',
            distrito_list: {},
            distrito_value: '',
            querys:''
        }
    },
    components: {
        Dropdown,
        Input,
        Autocomplete
    },
    methods: {
        moment: function (e) {

            return moment(e).format('LLL')
        },
        async eventChange(e){
            console.log(e,'change')
        },
        async eventDepartament(e) {
            this.cleanDepartamento()
            if (e == null) {
                return
            }
            this.provincia_list = await this.loadData(`${this.pathService}/provinces?depid=${e.value}`)
        },
        async eventProvince(e) {
            this.cleanProvincia()
            if (e == null) {
                return
            }
            this.distrito_list = await this.loadData(`${this.pathService}/districts?depid=${this.departamento_value.value}&provid=${e.value}`)
        },
        async eventDistrict(e) {
            if (e == null) {
                this.storeF.ubigeoSelector = ''
                this.storeF.titleDistrito = ''
                return
            }
            const data = {
                dep: this.departamento_value,
                prov: this.provincia_value,
                dist: e
            }
            this.storeF.ubigeoSelector = this.ubigeo(data)
            this.storeF.titleDistrito = e.label
        },
        async loadData(url) {
            try {
                let code = await axios.post(url)
                if (code.status == 200) {
                    let datos = code.data.data
                    const options = []
                    for (let i in datos) {
                        options.push({
                            label: datos[i].name,
                            value: datos[i].id
                        })
                    }
                    return options
                }
            } catch (error) {
                return error.response;
            }
        },
        ubigeo(data) {
            if (data) {
                return latLng(data)
            }
        },
        cleanDepartamento() {
            this.provincia_value = ''
            this.provincia_list = {}
            this.cleanProvincia()
        },
        cleanProvincia() {
            this.storeF.ubigeoSelector = ''
            this.storeF.titleDistrito = ''
            this.distrito_value = ''
            this.distrito_list = {}
        }
    },
    async mounted() {
        moment.locale('es')
        this.departamento_list = await this.loadData(`${this.pathService}/departments`)
    },
    watch:{
        departamento_value(newQuestion, oldQuestion){
            console.log(newQuestion, oldQuestion)
        }
    },
    setup() {
        const storeF = filterStore()
        const storeM = mapaStore()
        return {
            storeM,
            storeF,
        }
    },
}
</script>