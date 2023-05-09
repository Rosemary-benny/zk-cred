import Web3 from 'web3';
import Verifier from '../contracts/Verifier.json';

const getVerifier = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Verifier.networks[networkId];
  return new web3.eth.Contract(Verifier.abi, deployedNetwork.address);
};

export default getVerifier;
