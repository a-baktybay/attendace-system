import { createApp, h, resolveComponent } from 'vue';
import '@/assets/css/index.css'
import { router } from './router';

const App = {
  name: 'AviaApp',
  render: () => h(resolveComponent('router-view'))
};

const app = createApp(App);

app
  .use(router)
  .mount('#app');