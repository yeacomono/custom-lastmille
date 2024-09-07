<template>
  <div id="layoutApp" class="h-full bg-gray-100">
    <LayoutDesktop v-if="activo">
      <template #body>
        <router-view />
      </template>
    </LayoutDesktop>
    <div v-else>
      No tiene permisos para ingresar
    </div>
  </div>
</template>

<script >
import LayoutDesktop from '@/layouts/layoutApp/DesktopLayout.vue'
export default {
  data() {
    return {
      activo:false
    }
  },
  methods:{
    loginValidate(){
      if (frappe.session.user) {
        console.log(frappe.session.user,'frappe.session.user')
         if(frappe.session.user == '74726067@shalomcontrol.com' ||
                 frappe.session.user == 'Administrator' ||
                 frappe.session.user == '74715630@shalomcontrol.com' ||
                 frappe.session.user == '74715630@shalomcontrol.com' ){
           this.activo = true
         }
      } else {
        this.activo = false
      }
    }
  },
  components: {
    LayoutDesktop
  },
  mounted(){

    setTimeout(() => {
      this.loginValidate()
    }, 800);

  }
}
</script>
