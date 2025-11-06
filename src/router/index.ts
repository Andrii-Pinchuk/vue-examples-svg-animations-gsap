import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/svg-animations',
    name: 'SvgAnimations',
    component: () => import('../views/SvgAnimations.vue')
  },
  {
    path: '/gsap',
    name: 'GsapExamples',
    component: () => import('../views/GsapExamples.vue')
  },
  {
    path: '/canvas',
    name: 'CanvasExamples',
    component: () => import('../views/CanvasExamples.vue')
  },
  {
    path: '/threejs',
    name: 'ThreeJsExamples',
    component: () => import('../views/ThreeJsExamples.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/vue-examples-svg-animations-gsap/'),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router

