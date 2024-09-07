import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes/router'
import App from './App.vue'



import {
    Button,
    Input,
    ErrorMessage,
    Dialog,
    FeatherIcon,
    Alert,
    Autocomplete,
    Badge,
    toast,
    Toasts,
    request,
    setConfig,
    frappeRequest,
    pageMetaPlugin,
    resourcesPlugin,
} from 'frappe-ui'

const pinia = createPinia()
let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

let globalComponents = {
    Button,
    Input,
    ErrorMessage,
    Dialog,
    FeatherIcon,
    Alert,
    Autocomplete,
    Badge,
    toast,
    Toasts,
    request,
    setConfig,
    frappeRequest,
    pageMetaPlugin,
    resourcesPlugin,
}

for (let key in globalComponents) {
    app.component(key, globalComponents[key])
}
/**
 * declaración de componentes
*/
import menunav from '@/layouts/layoutApp/components/panelDropdown.vue'
app.component('menunav', menunav)

/** fin de componentes */

app.use(pinia)
app.mount('#app')
