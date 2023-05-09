import React, { useState } from "react";
import "./App.css";
import VerifierContract from "./contracts/Verifier.json";
import NFTContract from "./contracts/NFT.json";
import getWeb3 from "./getWeb3";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [verifierContract, setVerifierContract] = useState(null);
  const [nftContract, setNFTContract] = useState(null);
  const [age, setAge] = useState("");
  const [verified, setVerified] = useState(false);
  const [nftMinted, setNFTMinted] = useState(false);

  const connectToBlockchain = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      const verifierContract = new web3.eth.Contract(
        VerifierContract.abi,
        VerifierContract.networks[networkId].address
      );
      const nftContract = new web3.eth.Contract(
        NFTContract.abi,
        NFTContract.networks[networkId].address
      );

      setWeb3(web3);
      setAccounts(accounts);
      setVerifierContract(verifierContract);
      setNFTContract(nftContract);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAge = async () => {
    try {
      const result = await verifierContract.methods.verifyAge(age).call();
      setVerified(result);
    } catch (error) {
      console.error(error);
    }
  };

  const mintNFT = async () => {
    try {
      const result = await nftContract.methods.mint(accounts[0]).send({
        from: accounts[0],
      });
      setNFTMinted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Age Verification</h1>
        <p>Connect to Metamask and enter your age to verify</p>
        <div>
          <button onClick={connectToBlockchain}>Connect to Blockchain</button>
        </div>
        {web3 && (
          <>
            <div>
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <button onClick={verifyAge}>Verify Age</button>
            </div>
            {verified && (
              <>
                <p>Congratulations! You are verified to be over 18 years old.</p>
                {!nftMinted && (
                  <button onClick={mintNFT}>Mint NFT</button>
                )}
                {nftMinted && <p>You have been minted an NFT!</p>}
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
