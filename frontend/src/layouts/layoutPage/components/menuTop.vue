<template>
    <div class="flex relative z-10 justify-center">
      <div class="py-0 px-4 sm:min-w-screen-sm md:min-w-screen-md lg:min-w-screen-lg container">
        <div class=" row flex align-center h-[75px] justify-between flex-wrap ">
          <div class="flex items-center basis-80">
            <Button class="mr-2" appearance="minimal" icon="menu" @click="openClosePanel" />
            <h3
              class="text-4xl font-semibold overflow-ellipsis cursor-pointer mb-0 mr-2 max-w-md whitespace-nowrap align-middle">
              {{ titleNavigation }}</h3>
          </div>
          <div class="flex items-center ">
            <!--Buttons-->
            <slot name="btnList"></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { Dropdown } from 'frappe-ui'
  
  export default {
  
    data() {
      return {}
    },
    props: {
      titleNavigation: {
        type: String,
        default: 'Page'
      }
    },
    components: {
      Dropdown
    },
    methods: {
      openClosePanel(e) {
        this.$emit('btnLateral', 'todo')
      }
    },
    mounted() {
  
    }
  }
  
  </script>