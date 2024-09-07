<template>
    <ul class="mt-0 list-none pl-0 mb-0 flex flex-row">
      <!--  <li class="relative m-auto ml-3.5 text-sm">
            <Dropdown :options="[
                { label: 'New File', component: 'menunav' }
            ]" :button="{ label: 'Menu', icon: 'bell' }" />
        </li>
        <li class="block h-6 m-auto ml-3.5 border-solid  border border-white border-r-slate-300"></li>

        <li class="relative m-auto ml-3.5 text-sm">
            <Dropdown :options="[
                { label: 'New File', handler: msn },
                { label: 'New Window' },
            ]" :button="{ label: 'Menu', icon: 'bell' }" />
        </li>-->
        <li class="relative m-auto ml-3.5 text-sm">
            <Dropdown :options="[
                {
                    group: 'New',
                    hideLabel: true,
                    items: [
                        {
                            label: 'My Profile',
                            handler: msn,
                            icon: 'user',

                        },
                        {
                            label: 'My Settings',
                            handler: () => msn,
                            // show/hide option based on condition function
                            condition: () => true,
                            icon: 'settings'
                        },
                    ],
                },
                {
                    group: 'Open',
                    hideLabel: true,
                    items: [
                        {
                            label: 'Log out',
                            handler: () => msn,
                            icon: 'x-square'
                        },
                    ],
                },

            ]">
                <template v-slot="{ open }">
                    <div :class="[
                        'cursor-pointer justify-center items-center rounded-full flex w-[36px] h-[36px] text-base font-medium text-teal-600',
                        open ? 'bg-green-100' : 'bg-green-50',
                    ]">
                        A
                    </div>
                </template>
            </Dropdown>
        </li>
    </ul>
</template>
<script>
import { Dropdown } from 'frappe-ui'
export default {
    components: {
        Dropdown
    },
    methods: {
        msn() {

        }
    }
}
</script>