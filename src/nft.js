import Web3 from 'web3';
import NFT from '../contracts/NFT.json';

const getNFT = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = NFT.networks[networkId];
  return new web3.eth.Contract(NFT.abi, deployedNetwork.address);
};

export default getNFT;

