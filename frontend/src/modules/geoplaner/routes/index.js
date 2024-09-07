export default {
    path:'/',
    name: 'geoplaner',
    component: () => import('../layout/mainLayout.vue'),
    children: [
        {
            path:'/',
            component: ()=> import('../views/Dashboard.vue')
        }
    ]
}