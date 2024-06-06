// store/index.js

import { createStore } from 'vuex';
import layoutModule from './modules/layout';

const store = createStore({
  modules: {
    layout: layoutModule,
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: import.meta.env.NODE_ENV !== 'production',
});

export default store;
