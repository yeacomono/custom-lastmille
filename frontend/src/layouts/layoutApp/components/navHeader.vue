<template>
    <div class="bg-white flex-wrap justify-center items-center flex top-0 z-[99] sticky p-0 shadow-sm bg-white-50 h-[60px]">
        <div
            class="sm:min-w-screen-sm md:min-w-screen-md lg:min-w-screen-lg container py-0 px-4 flex-nowrap flex items-center justify-between">
            <a href="" class="mr-0 inline-block whitespace-nowrap">
                <img src="@/assets/frappe-framework-logo.svg" alt="logo" class="w-6">
            </a>
            <ul class="mt-0 list-none pl-0 mb-0 flex text-xs ml-3.5 flex-row">
                <li v-for="(item, index) in items" :key="index">
                    <FeatherIcon name="chevron-right" class="h-4 w-4 text-zinc-600 inline-block mr-1" />
                    <router-link class="hover:underline cursor-pointer text-sm mr-2.5" :to="item.path">{{ item.label
                    }}</router-link>
                </li>
            </ul>
            <div class="flex basis-auto justify-end items-center grow">
                <div class=" fill-width flex-flow items-center justify-end flex">
                    <slot name="headerSearch"></slot>
                </div>
            </div>
            <slot name="headerBtn"></slot>           
        </div>
    </div>
</template>
<script>
import { Dropdown } from 'frappe-ui'

export default {
    data() {
        return {

        }
    },
    components: {
        Dropdown
    },
    methods: {
    
    },
    computed: {
        items() {
            const route = this.$route
            const matched = route.matched

            const items = matched.map((routeRecord, index) => {

                const label = routeRecord.meta && routeRecord.meta.breadcrumb ? routeRecord.meta.breadcrumb : routeRecord.name
                const path = route.path.split('/').slice(0, index + 2).join('/')

                return {
                    label,
                    path
                };
            });

            return items
        }
    }
}
</script>