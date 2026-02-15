import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import "@/animations/transitions.css"

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

import { addCollection } from '@iconify/vue'
import hugeIcons from '@iconify-json/hugeicons/icons.json'

addCollection(hugeIcons)

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
