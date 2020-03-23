import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
    /* your options */
    key: 'lelangoApp',
    storage: window.localStorage
    }).plugin(store);
  });
}
