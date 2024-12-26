import { createApp } from 'vue'
import './assets/styles/index.css'
import App from './App.vue'

import { router } from './router'
import { AddChildService } from './services/trampoline/add-child/add-child.service'
import { ApiConnection } from './services/http/api'
import { GetChildrenService } from './services/trampoline/get-children/get-children.service'

const app = createApp(App)

const apiConnection = new ApiConnection('http://localhost:3003/api/children')
const addChildService = new AddChildService(apiConnection)
const getChildrenService = new GetChildrenService(apiConnection)
app.provide('addChildService', addChildService)
app.provide('getChildrenService', getChildrenService)
app.use(router)
app.mount('#app')
