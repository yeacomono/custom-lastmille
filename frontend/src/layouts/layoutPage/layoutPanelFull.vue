<template>
    <menuTop class="bg-gray-100">
        <template v-slot:btnList>
            <slot name="btnView"></slot>
        </template>
    </menuTop>
    <div class="flex relative z-10 justify-center">
        <div class="py-0 px-4 sm:min-w-screen-sm md:min-w-screen-md lg:min-w-screen-lg container">
            <div class="flex flex-wrap ">

                <div class="relative basis-0 flex grow">
                    <div class="grow overflow-hidden shadow-sm p-0 rounded-md bg-white">
                        <div class="flex m-0 p-4 flex-wrap">
                            <slot name="body"></slot>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import menuTop from '@/layouts/layoutApp/components/menuTop.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        menuTop,

    }
}
</script>