import { createStore } from "vuex";
import api from "@/utils/mtproto3";

async function getMessagesOfUser(user) {
  console.log("from user", user._)
  const inputPeer = {
    _: "inputPeerUser",
    user_id: user.id,
    access_hash: user.access_hash,
  };
  const LIMIT_COUNT = 40;
  const allMessages = [];
  await api.call("messages.getHistory", {
    peer: inputPeer,
    limit: LIMIT_COUNT,
  });
  for (let offset = 0; offset < 1; offset += LIMIT_COUNT) {
    const history = await api.call("messages.getHistory", {
      peer: inputPeer,
      add_offset: offset,
      limit: LIMIT_COUNT,
    });
    allMessages.push(...history.messages);
  }
  return allMessages;
}

async function getMessagesOfChannel(user) {
  console.log("from channel", user._)
  const resolvedPeer = await api.call("contacts.resolveUsername", {
    username: user.username,
  });

  const channel = resolvedPeer.chats.find(
    (chat) => chat.id === resolvedPeer.peer.channel_id
  );

  const inputPeer = {
    _: "inputPeerChannel",
    channel_id: channel.id,
    access_hash: channel.access_hash,
  };

  const LIMIT_COUNT = 40;
  const allMessages = [];

  await api.call("messages.getHistory", {
    peer: inputPeer,
    limit: LIMIT_COUNT,
  });

  // const historyCount = firstHistoryResult.count;

  for (let offset = 0; offset < 1; offset += LIMIT_COUNT) {
    const history = await api.call("messages.getHistory", {
      peer: inputPeer,
      add_offset: offset,
      limit: LIMIT_COUNT,
    });

    allMessages.push(...history.messages);
  }

  return allMessages;
}

export default createStore({
  state: {
    phone: "",
    phone_hash: "",
    chats: [],
    user: {},
    dialogs: {},
    users_stauses: [],
    messages: null,
  },
  mutations: {
    SET_CHAT_WITH_USER: (state, messages) => {
      state.messages = messages;
    },
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
      console.log("commited update", update);
      let userIndex = state.dialogs.users.findIndex(
        (user) => user.id === update.user_id
      );
      if (userIndex >= 0) {
        state.dialogs.users[userIndex].status = update.status;
      }
    },
  },
  actions: {
    TYPING_MESSAGE: async ({ state, getters }) => {
      let last_message = { ...state.messages[state.messages.length - 1] };
      let peer = { ...last_message.peer_id };
      let user = getters.GET_USER(peer.user_id);
      let resultOfRead = await api.call("messages.setTyping", {
        peer: {
          _: "inputPeerUser",
          user_id: user.id,
          access_hash: user.access_hash,
        },
        action: {
          _: "sendMessageTypingAction",
        },
      });
      console.log("asd", resultOfRead);
    },
    READ_MESSAGE: async ({ dispatch, state, getters }) => {
      let last_message = { ...state.messages[state.messages.length - 1] };
      let peer = { ...last_message.peer_id };
      console.log("perr", peer);
      let user = getters.GET_USER(peer.user_id);
      console.log("user", user.id);
      let resultOfRead = await api.call("messages.readHistory", {
        peer: {
          _: "inputPeerUser",
          user_id: user.id,
          access_hash: user.access_hash,
        },
        max_id: last_message.id,
      });
      await dispatch("GET_DAILOGS");
      console.log("asd", resultOfRead);
    },
    SEND_MESSAGE: async ({ dispatch, state }, message) => {
      let result_of_send_message = await api.call(
        "messages.sendMessage",
        message
      );
      await dispatch("GET_MESSAGES", state.user);
      console.log(result_of_send_message);
    },
    GET_MESSAGES: async ({ commit }, user) => {
      console.log("user", user);
      switch (user._) {
        case "user": {
          let allMessages = await getMessagesOfUser(user)
          commit("SET_CHAT_WITH_USER", allMessages.reverse())
          break;
        }
        case "channel": {
          let allMessagesChannel = await getMessagesOfChannel(user)
          commit("SET_CHAT_WITH_USER", allMessagesChannel.reverse())
          break;
        }
        default:
          break;
      }
    },
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
    // GET_USER_STATUS: (state) => {
    //   return state.dialogs.users;
    // },
    GET_CURRENT_USER: (state) => {
      if (state.dialogs.users) {
        let user = state.dialogs.users.find(
          (user) => user.id === state.user.id
        );
        if (user) return user;
        else return "";
      }
      return "";
    },
    GET_MESSAGE: (state, getters) => (id_) => {
      let { message, date, out, from_id } = state.dialogs.messages.find(
        (message) => message.id === id_
      );
      let self = from_id ? getters.GET_USER(from_id.user_id) : "";
      let from = self.self ? "You" : from_id ? self.first_name : "";
      return {
        message,
        date,
        out,
        from,
      };
    },
    GET_CHANNEL: (state) => (id_) => {
      let {
        id,
        access_hash,
        title,
        broadcast,
        username,
        _,
      } = state.dialogs.chats.find((chat) => chat.id === id_);
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
      let {
        id,
        access_hash,
        broadcast,
        title,
        username,
        _,
      } = state.dialogs.chats.find((chat) => chat.id === id_);
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
        if (state.dialogs.users) {
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
            _,
          };
        } else return {};
      };
    },
    GET_ALL: (state, getters) => {
      if (Object.keys(state.dialogs).length > 0) {
        return state.dialogs.dialogs.map((dialog) => {
          let changableObject = {};
          switch (dialog.peer._) {
            case "peerChat":
              changableObject = getters.GET_GROUP(dialog.peer.chat_id);
              changableObject.muted = dialog.notify_settings.mute_until;

              break;
            case "peerUser":
              changableObject = getters.GET_USER(dialog.peer.user_id);
              changableObject.muted = dialog.notify_settings.mute_until;
              break;
            case "peerChannel":
              changableObject = getters.GET_CHANNEL(dialog.peer.channel_id);
              changableObject.muted = dialog.notify_settings.mute_until;
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
