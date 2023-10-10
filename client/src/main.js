import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import VueCountdown from '@chenfengyuan/vue-countdown';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component(VueCountdown.name, VueCountdown);
const pinia = createPinia()
pinia.use(({ store }) =>
{
    store.$router = markRaw(router)
})
app.use(pinia)

app.use(router)

app.mount('#app')
