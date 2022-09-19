const nearAPI = require("near-api-js");

const { connect } = nearAPI;

const initNear = async () => {
    const near = await connect({
       networkId: 'shardnet',
       nodeUrl: 'https://archival-rpc.shardnet.near.org/'
    })
    return near
  }

module.exports = initNear
