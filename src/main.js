import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

import App from './App.vue'
import BreedOverview from './views/BreedOverview.vue'
import BreedDetail from './views/BreedDetail.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: BreedOverview },
    { path: '/breed/:name', component: BreedDetail },
  ],
})

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: 1000 * 60 * 30,
        retry: 2,
      },
    },
  },
})
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
    },
  },
})

app.component('PButton', Button)
app.component('PProgressSpinner', ProgressSpinner)

app.mount('#app')
