import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createLogger from 'vuex/dist/logger';
import common from './modules/common';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
// const debug = false

const storeKey = '_TIGER_STORE__';

const plugins = [
    createPersistedState({
        storage: window.sessionStorage,
        key: storeKey,
        reducer(vuexState) {
            return {
                common: vuexState.common
            }
        }
    }),
    createPersistedState({
        storage: window.localStorage,
        key: storeKey,
        reducer(vuexState) {
            return {
                // demo
                demo: {
                    demoBindCache: vuexState.common.userInfo,
                }
            }
        }
    })
];
/* eslint-disable no-unused-expressions */
debug ? plugins.push(createLogger()) : null;

export default new Vuex.Store({
    modules: {
        common,
    },
    plugins,
    strict: debug
});
