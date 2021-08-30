const { sleep } = require('@mtproto/core/src/utils/common');
import store from '@/store/index.js';
const MTProto = require('@mtproto/core/envs/browser');

const api_id = 7325057;
const api_hash = 'c77e8aed56224fbcee288551fae16552'

import router from '@/router'

class API {
  constructor() {
    this.mtproto = new MTProto({
      api_id,
      api_hash,
    });
    this.mtproto.updates.on('updatesTooLong', (updateInfo) => {
        console.log('updatesTooLong:', updateInfo);
      });
      
      this.mtproto.updates.on('updateShortMessage', (updateInfo) => {
        console.log('updateShortMessage:', updateInfo);
        store.dispatch('GET_DAILOGS')
      });

      this.mtproto.updates.on('receivedNotifyMessage', (updateInfo) => {
        console.log('updatesTooLong:', updateInfo);
      });

      this.mtproto.updates.on('updateShortSentMessage', (updateInfo) => {
        console.log('aaa updateShortSentMessage:', updateInfo);
      })
      
      this.mtproto.updates.on('updateShortChatMessage', (updateInfo) => {
        console.log('updateShortChatMessage:', updateInfo);
      });
      
      this.mtproto.updates.on('updateShort', async (updateInfo) => {
        console.log('updateShort:', updateInfo);

        if(updateInfo.update._ === 'updateUserStatus') {
          console.log('checkpoint')
          updateUserStatusStore(updateInfo.update);
        }

        if(updateInfo.update._ === 'updateLoginToken') {
         
          clearInterval(localStorage.getItem('interval_id'))
          localStorage.removeItem('interval_id')
          let result = await this.call("auth.exportLoginToken", { except_ids: []})
          localStorage.setItem('authentication',JSON.stringify(result.authorization))
          console.log('Second time call auth.exportLoginToken RESULT:', result)
          router.push('/')
        }
      });
      
      this.mtproto.updates.on('updatesCombined', (updateInfo) => {
        console.log('updatesCombined:', updateInfo);
      });
      
      this.mtproto.updates.on('updateUserTyping', (updateInfo) => {
        console.log('updateUserTyping:', updateInfo);
      });
      this.mtproto.updates.on('updates', (updateInfo) => {
        console.log('updates:', updateInfo);
      });
      
      this.mtproto.updates.on('updateShortSentMessage', (updateInfo) => {
        console.log('updateShortSentMessage:', updateInfo);
      });
  }

  async call(method, params, options = {}) {
    try {
      const result = await this.mtproto.call(method, params, options);

      return result;
    } catch (error) {
      console.log(`${method} error:`, error);

      const { error_code, error_message } = error;

      if (error_code === 420) {
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);
        const ms = seconds * 1000;

        await sleep(ms);

        return this.call(method, params, options);
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_');

        const dcId = Number(dcIdAsString);

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId);
        } else {
          Object.assign(options, { dcId });
        }

        return this.call(method, params, options);
      }

      return Promise.reject(error);
    }
  }
}

const api = new API();

function updateUserStatusStore(update) {
  store.commit('USER_STATUS_UPDATE', update);
}




export default api;