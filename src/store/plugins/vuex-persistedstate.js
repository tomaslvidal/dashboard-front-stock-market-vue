import Plugin from 'vuex-persistedstate';

const VuexPersistedstate = Plugin({
    key: 'root',
    storage: localStorage
});

export default VuexPersistedstate;