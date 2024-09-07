<template>
    <pagePanel :titlePage="title">
        <template #btnList>
            <navOptions></navOptions>
        </template>
        <template #filters>
            <filterOptions></filterOptions>
        </template>
        <template #body>
            <router-view></router-view>
        </template>
        <template #footer>

        </template>
    </pagePanel>
</template>
<script>

import { provide } from 'vue'
import pagePanel from '@/layouts/layoutPage/layoutPanel.vue'
import navOptions from '../components/navBtnOptions.vue'
import filterOptions from '../components/barFilters.vue'

import { mapaStore } from '../data/mapaStore'

export default {
    name: 'HomePage',
    data() {
        return {
            
        }
    },
    components: {
        pagePanel,
        navOptions,
        filterOptions
    },
    methods: {

    },
    mounted() {

    },
    computed: {
        title() {
            const storeMap = mapaStore()
            return storeMap.title
        }
    }
}
</script>