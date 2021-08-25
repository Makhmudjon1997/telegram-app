const MTProto = require('@mtproto/core/envs/browser');

const api_id = 7325057;
const api_hash = 'c77e8aed56224fbcee288551fae16552'

// 1. Create instance
const mtproto = new MTProto({
  api_id,
  api_hash,
//   test: true,
});

// 2. Print the user country code
mtproto.call('help.getNearestDc').then(result => {
  console.log('country:', result.country);
});


export default mtproto