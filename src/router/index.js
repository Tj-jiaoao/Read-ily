import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomeView from '../views/HomeView.vue'
import BookReader from '../views/BookReader.vue'

if (typeof window.HSStaticMethods === 'undefined') {
  window.HSStaticMethods = {};
}

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/book/:fileName?',
    name: 'BookReader',
    component: BookReader,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100)
  }
});

export default router
