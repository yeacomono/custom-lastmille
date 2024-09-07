import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import geomapRouter from '@/modules/geoplaner/routes/index.js'
const routes = [
  geomapRouter
]

let router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router