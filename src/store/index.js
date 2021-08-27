import { createStore } from "vuex";
import api from "@/utils/mtproto3";

export default createStore({
  state: {
    phone: "",
    phone_hash: "",
    chats: [],
    user: {},
    dialogs: {}
  },
  mutations: {
    SET_PHONE: (state, phone) => {
      state.phone = phone;
    },
    SET_PHONE_HASH: (state, phone_hash) => {
      state.phone_hash = phone_hash;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_DIALOGS: (state, dialogs) => {
      state.dialogs = dialogs 
    },
    SET_DIALOG_FILTERS: (state, filters) => {
      state.dialog_filters = filters
    }
  },
  actions: {
    GET_DIALOG_FILTERS: async ({commit}) => {
      try {
        let result = await api.call('messages.getSuggestedDialogFilters')
        commit('SET_DIALOG_FILTERS', result)
      } catch (error) {
        return error
      }
    },
    GET_DAILOGS: async ({commit}) => {
      try {
        let result = await api.call("messages.getDialogs", {
          folder_id: 0, //	flags.1?int	Peer folder ID, for more info click here
          offset_date: -1, //	int	Offsets for pagination, for more info click here
          offset_id: 10, //	int	Offsets for pagination, for more info click here
          offset_peer: { _: "inputPeerSelf" },
          limit: 100, //	int	Number of list elements to be returned
          hash: 0 // int	Hash for pagination, for more info click here
        });
        commit('SET_DIALOGS', result);
        return 
      } catch (error) {
        return error;
      }
    },
    GET_USER: async ({ commit }, ) => {
      try {
        const user = await api.call("users.getFullUser", {
          id: {
            _: "inputUserSelf",
          },
        });
        commit('SET_USER', user)
        return
      } catch (error) {
        return null;
      }
    },
  },

  getters: {
    GET_ALL: (state) => {
      return state.dialogs.dialogs
    },
    GET_PERSONAL: (state) => {
      return state.dialogs.users.filter(user => !user.bot && user.contact)
    },
    GET_GROUPS: (state) => {
      return state.dialogs.chats.filter(chat => !chat.left && !chat.broadcast && chat._ !== 'chatForbidden')
    },
    GET_CHANNLES: (state) => {
      return state.dialogs.chats.filter(chat => !chat.left && chat.broadcast && chat._ !== 'chatForbidden')
    },
    GET_BOTS: (state) => {
      return state.dialogs.users.filter(user => user.bot)
    }
  },

  modules: {},
});
