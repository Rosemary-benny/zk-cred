const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'your mnemonic here';

module.exports = {
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/your-infura-id`),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  }
};
