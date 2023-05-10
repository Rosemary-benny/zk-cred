// Import required libraries
import React, { useState } from 'react';
import Web3 from 'web3';
import { AgeVerification } from './contracts/AgeVerification.sol';
import { nftContractABI } from './contracts/NFTContractABI.js';
import { setupZKProof } from './zkp.ts';

function App() {
  // Set initial state values
  const [age, setAge] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [nftCreated, setNFTCreated] = useState(false);
  const [nftImageUrl, setNFTImageUrl] = useState('');
  
  // Initialize Web3 and smart contract variables
  const web3 = new Web3(Web3.givenProvider);
  const ageVerificationContract = new web3.eth.Contract(AgeVerification.abi, AgeVerification.address);
  const nftContract = new web3.eth.Contract(nftContractABI, '[NFT_CONTRACT_ADDRESS]'); // Replace with your own NFT contract address
  
  // Handle age verification form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Generate zero-knowledge proof
    const { proof, publicSignals } = await setupZKProof(parseInt(age, 10));

    // Call age verification smart contract with proof and public signals
    const verified = await ageVerificationContract.methods.verifyAgeWithProof(proof, publicSignals).call();
    setIsVerified(verified);
    if (verified) {
      // Create NFT if age is verified
      await createNFT();
    }
  };

  // Create NFT using the verified age as metadata
  const createNFT = async () => {
    const accounts = await web3.eth.requestAccounts();
    const metadata = {
      'age': age,
    };
    const tokenId = await nftContract.methods.createToken(accounts[0], JSON.stringify(metadata), nftImageUrl).send({ from: accounts[0] });
    setNFTCreated(true);
  };

  // Render age verification form and NFT creation result
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" value={age} onChange={e => setAge(e.target.value)} />
        </label>
        <br />
        <button type="submit">Verify Age</button>
      </form>
      {isVerified && <p>Your age has been verified!</p>}
      {nftCreated && <p>Your NFT has been created!</p>}
    </div>
  );
}

export default App;
