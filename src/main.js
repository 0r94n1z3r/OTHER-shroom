import '@/style/reset.scss'
import '@/style/colors.scss'
import '@/style/style.scss'

import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

//libs
    import { createPinia } from 'pinia';

    app.use(createPinia())

//components
    import FadingP from '@/components/FadingP.vue';

    app.component('FadingP', FadingP);

app.mount('#app')
