import { createStore } from "vuex";
import api from "@/utils/mtproto3";

export default createStore({
  state: {
    phone: "",
    phone_hash: "",
    chats: [],
    user: {},
    dialogs: {},
    users_stauses: [],
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
      state.dialogs = dialogs;
    },
    SET_DIALOG_FILTERS: (state, filters) => {
      state.dialog_filters = filters;
    },
    USER_STATUS_UPDATE(state, update) {
      console.log('commited update', update)
      let userIndex = state.dialogs.users.findIndex(user => user.id === update.user_id);
      if(userIndex >= 0) {
        state.dialogs.users[userIndex].status = update.status
      }
    },
  },
  actions: {
    
    GET_DIALOG_FILTERS: async ({ commit }) => {
      try {
        let result = await api.call("messages.getSuggestedDialogFilters");
        commit("SET_DIALOG_FILTERS", result);
      } catch (error) {
        return error;
      }
    },
    GET_DAILOGS: async ({ commit }) => {
      try {
        let result = await api.call("messages.getDialogs", {
          folder_id: 0, //	flags.1?int	Peer folder ID, for more info click here
          offset_date: -1, //	int	Offsets for pagination, for more info click here
          offset_id: 10, //	int	Offsets for pagination, for more info click here
          offset_peer: { _: "inputPeerSelf" },
          limit: 100, //	int	Number of list elements to be returned
          hash: 0, // int	Hash for pagination, for more info click here
        });
        commit("SET_DIALOGS", result);
        return;
      } catch (error) {
        return error;
      }
    },
    GET_USER: async ({ commit }) => {
      try {
        const user = await api.call("users.getFullUser", {
          id: {
            _: "inputUserSelf",
          },
        });
        commit("SET_USER", user);
        return;
      } catch (error) {
        return null;
      }
    },
  },

  getters: {
    GET_USER_STATUS: (state) => {
      return state.dialogs.users
    },
    GET_MESSAGE: (state, getters) => id_ => {
      let {
        message,
        date,
        out,
        from_id
      } = state.dialogs.messages.find((message) => message.id === id_);
      let  self = from_id ? getters.GET_USER(from_id.user_id): ''
      let from = self.self ? 'You' : ( from_id ? self.first_name : '')
      return {
        message,
        date,
        out,
        from
      }
    },
    GET_CHANNEL: (state) => (id_) => {
      let { id, access_hash, title, broadcast, username, _ } = state.dialogs.chats.find(
        (chat) => chat.id === id_
      );
      return {
        id,
        access_hash,
        title,
        broadcast,
        username,
        _,
      };
    },
    GET_GROUP: (state) => (id_) => {
      let { id, access_hash, broadcast, title, username, _ } = state.dialogs.chats.find(
        (chat) => chat.id === id_
      );
      return {
        id,
        access_hash,
        title,
        broadcast,
        username,
        _,
      };
    },
    GET_USER: (state) => {
      return (id_) => {
        let {
          access_hash,
          bot,
          first_name,
          username,
          id,
          status,
          self,
          _,
        } = state.dialogs.users.find((user) => user.id === id_);
        return {
          access_hash,
          bot,
          first_name,
          username,
          id,
          status,
          self,
          _
        };
      };
    },
    GET_ALL: (state, getters) => {
      if (Object.keys(state.dialogs).length > 0) {
        return state.dialogs.dialogs.map((dialog) => {
          let changableObject = {};
          switch (dialog.peer._) {
            case "peerChat":
              changableObject = getters.GET_GROUP(dialog.peer.chat_id);
              changableObject.muted = dialog.notify_settings.mute_until
              
              break;
            case "peerUser":
              changableObject = getters.GET_USER(dialog.peer.user_id);
              changableObject.muted = dialog.notify_settings.mute_until
              break;
            case "peerChannel":
              changableObject = getters.GET_CHANNEL(dialog.peer.channel_id);
              changableObject.muted = dialog.notify_settings.mute_until
              break;
            default:
              break;
          }

          return {
            ...changableObject,
            ...getters.GET_MESSAGE(dialog.top_message),
            read_inbox_max_id: dialog.read_inbox_max_id,
            read_outbox_max_id: dialog.read_outbox_max_id,
            top_message: dialog.top_message,
            unread_count: dialog.unread_count,
          };
        });
      } else {
        return [];
      }
    },
    GET_PERSONAL: (state) => {
      return state.dialogs.users.filter((user) => !user.bot && user.contact);
    },
    GET_GROUPS: (state) => {
      return state.dialogs.chats.filter(
        (chat) => !chat.left && !chat.broadcast && chat._ !== "chatForbidden"
      );
    },
    GET_CHANNLES: (state) => {
      return state.dialogs.chats.filter(
        (chat) => !chat.left && chat.broadcast && chat._ !== "chatForbidden"
      );
    },
    GET_BOTS: (state) => {
      return state.dialogs.users.filter((user) => user.bot);
    },
  },

  modules: {},
});
