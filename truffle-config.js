const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = 'your mnemonic goes here';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          'https://rinkeby.infura.io/v3/your-infura-project-id'
        );
      },
      network_id: 4,
    },
  },
};
