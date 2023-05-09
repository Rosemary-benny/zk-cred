const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = '<your-mnemonic>';
const infuraUrl = 'https://rinkeby.infura.io/v3/<your-infura-project-id>';

module.exports = {
  networks: {
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, infuraUrl);
      },
      network_id: '4',
    },
  },
  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
};
