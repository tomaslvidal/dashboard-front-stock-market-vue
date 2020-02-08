import Plugin from 'vuex-persistedstate';

import SecureLS from "secure-ls";

import AES from 'crypto-js/aes';

import enc_utf8 from 'crypto-js/enc-utf8';

const ls = new SecureLS({ encodingType: 'aes' });

const VuexPersistedstate = Plugin({
    key: 'root',
    storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
    }
});

export default VuexPersistedstate;