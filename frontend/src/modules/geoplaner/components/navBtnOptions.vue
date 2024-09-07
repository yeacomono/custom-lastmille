<template>
    <div class="flex font-semibold">{{ titleDistrito }}</div>
    <Tooltip text="Centrar mapa">
        <Button class="ml-2" icon="rotate-cw" @click="centerMap"/>
    </Tooltip>
    <Button class="ml-2" appearance="primary" v-if="storeM.createBtn" icon-left="plus" @click="crear">Crear</Button>
    <Button class="ml-2" appearance="primary" v-if="storeM.saveBtn" icon-left="save" @click="save">Grabar</Button>
    <Button class="ml-2" appearance="primary" v-if="storeM.editBtn" icon-left="edit" @click="edit">Editar</Button>
    <Toasts/>
</template>
<script>
    import {Dropdown, Tooltip, Button, toast, Toasts} from 'frappe-ui'
    import {mapaStore} from '../data/mapaStore'
    import {filterStore} from '../data/filterStore'

    export default {
        data() {
            return {}
        },
        components: {
            Dropdown,
            Tooltip,
            Button,
            Toasts
        },
        methods: {
            centerMap() {
                this.storeM.centerMap()
            },
            async crear() {
                this.storeM.drawAreaSelectionMap()
            },
            async save() {
                const valor = await this.storeM.saveLatlngSelectionDraw()
                const {ubigeo, geojson, name, date, owner} = valor
                console.log(valor, 'valore')
                if (typeof valor === 'object') {
                    toast({
                        title: 'Success',
                        text: 'Geocerca guardada',
                        icon: 'check',
                        iconClasses: 'text-green-500',
                        position: 'top-center',
                        timeout: 2,
                    })
                    this.storeM.historyEditPolygon.push({ubigeo, geojson, name, date, owner})
                } else {
                    toast({
                        title: 'Error',
                        text: 'Problemas de conexión',
                        icon: 'alert-triangle',
                        iconClasses: 'text-red-500',
                        position: 'top-center',
                        timeout: 3,
                    })
                }
            },
            edit() {
                this.storeM.editSelectionDraw()
            }
        },
        computed: {
            titleDistrito() {
                return this.storeF.titleDistrito
            }
        },
        setup() {
            const storeM = mapaStore()
            const storeF = filterStore()
            return {
                storeF,
                storeM
            }
        },
    }
</script>