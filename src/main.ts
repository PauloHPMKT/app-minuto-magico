import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import './assets/styles/index.css'
import App from './App.vue'

import { router } from './router'
import { AddChildService } from './services/trampoline/data/usecases/add-child/add-child.service'
import { ApiConnection } from './services/trampoline/infra/http/api'
import { GetChildrenService } from './services/trampoline/data/usecases/get-children/get-children.service'

const app = createApp(App)
const pinia = createPinia()

const apiConnection = new ApiConnection(import.meta.env.VITE_API_URL)
const addChildService = new AddChildService(apiConnection)
const getChildrenService = new GetChildrenService(apiConnection)
app.provide('addChildService', addChildService)
app.provide('getChildrenService', getChildrenService)

app.use(pinia)
pinia.use(piniaPluginPersistedState)
app.use(router)
app.mount('#app')
