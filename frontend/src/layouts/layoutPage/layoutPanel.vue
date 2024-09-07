<template>
    <menuTop class="bg-gray-100" :titleNavigation="titlePage" @btnLateral="eventPanel">
        <template v-slot:btnList>
            <slot name="btnList"></slot>
        </template>
    </menuTop>
    <div class="flex relative z-10 justify-center">
        <div class="py-0 px-4 sm:min-w-screen-sm md:min-w-screen-md lg:min-w-screen-lg container">
            <div class="flex flex-wrap ">
                <div class="relative w-full flex basis-1/6 pr-8" v-if="open">
                    <slot name="filters"></slot>
                </div>
                <div class="relative basis-0 flex grow">
                    <div class="grow overflow-hidden shadow-sm p-0 rounded-md bg-white">
                        <div class="flex m-0 p-4 flex-wrap">
                            <slot name="body"></slot>
                        </div>
                    </div>

                </div>
            </div>
            <div class="w-full mt-4 mb-8">
                <slot name="footer"></slot>
            </div>
        </div>

    </div>
</template>
<script >
import menuTop from '@/layouts/layoutPage/components/menuTop.vue'
export default {
    data() {
        return {
            open: true
        }
    },
    props: {
        titlePage: {
            type: String,
            default: 'Page'
        }
    },
    components: {
        menuTop
    },
    methods: {
        eventPanel(e) {
            this.open = !this.open
        },
    },
    mounted() {}
}
</script>