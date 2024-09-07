<template>
    <Autocomplete class="!w-80" :options="[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
    ]" v-model="fruit" placeholder="Select a fruit" />
</template>
<script>
import { Dropdown } from 'frappe-ui'
export default {
    data() {
        return {
            fruit: ''
        }
    },
    components: {
        Dropdown
    },
    methods: {
        msn() {

        }
    }
}
</script>