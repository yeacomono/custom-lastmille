<template>
    <!--<headerDesk>
      <template #headerSearch>
        <searchView></searchView>
      </template>
      <template #headerBtn>
        <btnOptions></btnOptions>
      </template>
    </headerDesk>-->
    <div id="DesktopLayout">
      <slot name="body"></slot>
    </div>
  </template>
  <script>
  import headerDesk from '@/layouts/layoutApp/components/navHeader.vue'
  import btnOptions from './components/btnOptions.vue'
  import searchView from './components/headerSearch.vue'
  
  export default {
    data() {
      return {
        fruit: ''
      }
    },
    components: {
      headerDesk,
      btnOptions,
      searchView
    }
  }
  </script>