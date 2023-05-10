const express = require('express');
const app = express();
const { SnarkJS } = require('snarkjs');

// Set up the SnarkJS library
const snarkjs = new SnarkJS();

// Set up the Cairo code for the zero-knowledge proof
const circuitDef = require('./ageVerification.json');
const circuit = new snarkjs.Circuit(circuitDef);

app.use(express.json());

// Route for verifying a user's age
app.post('/verify-age', async (req, res) => {
  const age = req.body.age;

  // Generate the witness for the age verification circuit
  const witness = circuit.calculateWitness({ age });

  // Generate the proof
  const { proof } = await snarkjs.groth16.genProof(circuitDef.vk, witness);

  // Verify the proof
  const isValid = snarkjs.groth16.verify(circuitDef.vk, proof, [age]);

  if (isValid) {
    // Generate and send the NFT to the user
    const { create } = require('ipfs-http-client');
const { encode } = require('base64-arraybuffer');
const { soliditySha3 } = require('web3-utils');
const { default: axios } = require('axios');
const { ethers } = require('ethers');
const { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, PRIVATE_KEY } = process.env;

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const provider = new ethers.providers.JsonRpcProvider();
const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function generateNFT(age, address) {
  // Generate the token ID using the user's address and the current timestamp
  const tokenId = soliditySha3(address, Date.now());

  // Generate the metadata for the NFT
  const metadata = {
    name: `Age Verified NFT (${age} years old)`,
    description: `This NFT verifies that the owner is at least ${age} years old.`,
    image: '',
    attributes: [
      {
        trait_type: 'Age',
        value: age.toString(),
      },
    ],
  };

  // Upload the metadata to IPFS
  const metadataHash = await ipfs.add(encode(JSON.stringify(metadata)));

  // Mint the NFT
  const transaction = await contract.connect(wallet).mint(address, tokenId, metadataHash.path);
  await transaction.wait();
}

    res.send('Verification successful. NFT sent to user.');
  } else {
    res.status(401).send('Age verification failed.');
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
