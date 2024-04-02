import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const store = createPinia();
// 本地持久化
store.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`,
    auto: false,
  }),
);
export function setupStore(app: App<Element>) {
  app.use(store);
}
export { store };
