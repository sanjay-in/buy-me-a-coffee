import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Modal from "../Modal/Modal";
import "./Home.css";
import FrappeLogo from "../../assets/frappe.png";
import CoffeeLogo from "../../assets/coffee.png";
import ABI from "../../../constants/contractABI.js";
import ConnectMetamask from "../ConnectMetamask/ConnectMetamask";
import BuyCoffee from "../BuyCoffee/BuyCoffee";

const Home = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isBuyingCoffee, setIsBuyingCoffee] = useState(false);
  const [isMetamaskExtenstionError, setIsMetamaskExtentionError] = useState(false);
  const [isBuyingCoffeeError, setIsBuyingCoffeeError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contractAddress = "0x108Ad80b31f2e0518C72dA5f3E18ef176b8b33cE";

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log("accounts: ", accounts[0]);
        setIsWalletConnected(true);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const connectWalletBtn = async () => {
    try {
      if (!window.ethereum) {
        setIsMetamaskExtentionError(true);
      } else {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("accounts", accounts[0]);
        setIsWalletConnected(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyCoffee = async (e, name, message, amount) => {
    setIsBuyingCoffee(true);
    e.preventDefault();
    try {
      if (window.ethereum) {
        // const provider = new ethers.BrowserProvider(window.ethereum);
        // const signer = await provider.getSigner();
        // const buyMeACoffe = new ethers.Contract(contractAddress, ABI, signer);


      }
    } catch (error) {
      setIsBuyingCoffeeError(true);
      console.log(error);
    }
  };

  const getAllMemos = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const buyMeACoffee = new ethers.Contract(contractAddress, ABI, signer);
        const memos = await buyMeACoffee.getAllMemos();
        console.log("buyMeACoffee", buyMeACoffee);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalOnClose = (modalName) => {
    if (modalName === "metamaskExtensionError") {
      setIsMetamaskExtentionError(false);
    } else if (modalName === "buyCoffeeError") {
      setIsBuyingCoffeeError(false);
    } else if (modalName === "success") {
        window.location.reload();
    }
  };

  useEffect(() => {
    connectWallet();
    getAllMemos();
  }, []);
  return (
    <div>
      <img className="frappe-logo" src={FrappeLogo} />
      <img className="coffee-logo" src={CoffeeLogo} />
      <h2 className="header">Buy a Coffee</h2>
      {isWalletConnected ? (
        <BuyCoffee isBuyingCoffee={isBuyingCoffee} onClick ={buyCoffee}/>
      ) : (
        <ConnectMetamask onClick={connectWalletBtn} />
      )}
      {isMetamaskExtenstionError ? (
        <Modal
          show={isMetamaskExtenstionError}
          onClose={handleModalOnClose}
          type="metamaskExtensionError"
          title="Install MetaMask"
          message="Please make sure your browser has MetaMask extension installed"
        />
      ) : isBuyingCoffeeError ? (
        <Modal
          show={isBuyingCoffeeError}
          onClose={handleModalOnClose}
          type="buyCoffeeError"
          title="Transaction Error"
          message="There was an error while transaction. Please try again."
        />
      ) : isSuccess ? <Modal
      show={isSuccess}
      onClose={handleModalOnClose}
      type="success"
      title="Thank You!"
      message="I'm grateful for your generosity in contributing. Thank you for your support🤝"
    /> : null}
    </div>
  );
};

export default Home;
