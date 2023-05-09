import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';
import zkAgeVerification from './contracts/zkAgeVerification.json';
import nftContract from './contracts/NFT.json';
import { verifierABI } from './contracts/Verifier';
import { nftABI } from './contracts/NFT';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [age, setAge] = useState('');
  const [ageProof, setAgeProof] = useState('');
  const [verified, setVerified] = useState(false);
  const [nftMinted, setNftMinted] = useState(false);
  const [nftImage, setNftImage] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftContractInstance, setNftContractInstance] = useState(null);
  const [verifierContractInstance, setVerifierContractInstance] = useState(null);
  const [zkAgeVerificationInstance, setZkAgeVerificationInstance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setWeb3(web3);
        setAccount(accounts[0]);
        initializeContracts(web3);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const initializeContracts = async (web3) => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = zkAgeVerification.networks[networkId];
      const zkAgeVerificationInstance = new web3.eth.Contract(
        zkAgeVerification.abi,
        deployedNetwork && deployedNetwork.address
      );
      setZkAgeVerificationInstance(zkAgeVerificationInstance);
      const verifierInstance = new web3.eth.Contract(
        verifierABI,
        deployedNetwork && deployedNetwork.verifier
      );
      setVerifierContractInstance(verifierInstance);
      const nftInstance = new web3.eth.Contract(
        nftABI,
        deployedNetwork && deployedNetwork.nft
      );
      setNftContractInstance(nftInstance);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAge = async () => {
    if (age && ageProof) {
      try {
        const result = await zkAgeVerificationInstance.methods.verifyAge(ageProof).call();
        if (result) {
          setVerified(true);
          alert('Age verified successfully!');
        } else {
          alert('Age verification failed. Please try again with valid proof.');
        }
      } catch (error) {
        console.error(error);
        alert('Error occurred while verifying age. Please try again.');
      }
    } else {
      alert('Please enter valid age and age proof to verify your age.');
    }
  };

  const createNFT = async () => {
    if (verified && nftImage && nftName && nftDescription) {
      try {
        const ipfs = window.IpfsHttpClient('localhost', '5001', { protocol: 'http' });
        const imageCID = await ipfs.add(nftImage);
        const metadata = {
          name: nftName,
          description: nftDescription,
          image: `https://ipfs.io/ipfs/${imageCID.path}`,
        };
       
