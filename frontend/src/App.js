import buyChai from './contracts/buyChai.json'
import {useState, useEffect} from 'react'
import './App.css';
import { ethers } from 'ethers';
import Buy from './components/Buy'
import Transaction from './components/Transaction';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    accounts: 'None'
  });

  useEffect(()=> {
    const connectWallet = async () => {
      const contractAddress = "0x5Aa4eE25624d6c9EFcAAA215E8DD0400958892b3";
      const contractABI = buyChai.abi;
      try {
        const { ethereum } = window;
        if(ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts"
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setState({
            provider,
            signer,
            contract,
            accounts
          })
        }
      } catch(error) {
        console.log("ERROR => etherum not available for this browser " , error);
      }
    }

    connectWallet();
  },[])
  // console.log("STATE => ", state);

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src='/cup-of-coffee.jpg' className="img-fluid" alt="..." width="100%"  style={{height: "320px", objectFit: 'cover'}}/>
      <center>
        <h3 style={{fontWeight: 'bold'}}>Buy Cup Of Coffee</h3>
        <p class="text-muted lead " style={{ marginTop: "10px", marginLeft: "5px" }}>
          <small>Connected Account - {state.accounts}</small>
        </p>
      </center>
      <div className="container">
        <Buy state={state} />
        <Transaction state={state} />
      </div>
    </div>
  );
}

export default App;
