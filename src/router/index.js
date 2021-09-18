
import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/compat/app'
Vue.use(VueRouter)

const routes = [
  {
    path: '/categories',
    name: 'Categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/history/:id',
    name: 'History',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/History.vue')
  },
  {
    path: '/notes-history',
    name: 'NotesHistory',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/NotesHistory.vue')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/',
    name: 'Count',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Count.vue')
  },
  {
    path: '/add',
    name: 'AddNote',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/AddNote.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: { layout: 'empty' },
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiredAuth = to.matched.some(record => record.meta.auth)
  if (requiredAuth && !currentUser) {
    next('/auth?message=login')
  } else next()
})

export default router
