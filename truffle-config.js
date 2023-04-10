// Initialize HDWalletProvider
const HDWalletProvider = require("@truffle/hdwallet-provider");
const LoomTruffleProvider = require('loom-truffle-provider');
const { readFileSync } = require('fs')
const path = require('path')
const { join } = require('path')

function getLoomProviderWithPrivateKey (privateKeyPath, chainId, writeUrl, readUrl) {
  const privateKey = readFileSync(privateKeyPath, 'utf-8');
  return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
}


// 1. Initialize LoomTruffleProvider

// Set your own mnemonic here
const mnemonic = "hair wash boat miracle okay giraffe civil catch mail salt bullet bamboo";

// Module exports to make this configuration available to Truffle itself
module.exports = {
  // Object with configuration for each network
  networks: {
    // Configuration for mainnet
    mainnet: {
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/YOUR_TOKEN")
      },
      network_id: "1"
    },
    // Configuration for rinkeby network
    rinkeby: {
      // Special function to setup the provider
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/YOUR_TOKEN")
      },
      // Network id is 4 for Rinkeby
      network_id: 4
    },
    ganache: {
      // Special function to setup the provider
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(mnemonic, "HTTP://127.0.0.1:7545")
      },
      // Network id is 4 for Rinkeby
      network_id: 5777
    },
    loom_testnet: {
      provider: function() {
        const privateKey = 'FRZxmeAdvk4N3ntUXMQWGM20vektUmFv2wSiHuOzFjExcmEAIt/A37QochCIBr4ODtjtyNDUxTOdK7toEzbEUg=='
        const chainId = 'extdev-plasma-us1';
        const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc';
        const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query';
        return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
        },
      network_id: '9545242630824'
    },
    basechain: {
      provider: function() {
        const chainId = 'default';
        const writeUrl = 'http://basechain.dappchains.com/rpc';
        const readUrl = 'http://basechain.dappchains.com/query';
        const privateKeyPath = path.join(__dirname, 'mainnet_private_key');
        const loomTruffleProvider = getLoomProviderWithPrivateKey(privateKeyPath, chainId, writeUrl, readUrl);
        return loomTruffleProvider;
        },
      network_id: '*'
    }

  // 2. Put here the configuration for loom_dapp_chain

  }
};
