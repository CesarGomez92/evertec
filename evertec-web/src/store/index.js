import { createStore } from 'vuex';
import productsModule from './modules/products'

export default createStore({
  modules: {
    productsModule,
  },
});
