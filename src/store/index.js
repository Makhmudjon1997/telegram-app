import { createStore } from 'vuex'

export default createStore({
  state: {
    phone: '',
    phone_hash: '',
  },
  mutations: {
    SET_PHONE:(state, phone) => {
      state.phone = phone;
    },
    SET_PHONE_HASH:(state, phone_hash) => {
      state.phone_hash = phone_hash;
    },
  },
  actions: {
  },
  modules: {
  }
})
