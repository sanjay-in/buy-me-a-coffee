import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FrappeLogo from "../../assets/frappe.png";
import CoffeeLogo from "../../assets/coffee.png";
import "./Home.css";
import ConnectMetamask from "../ConnectMetamask/ConnectMetamask";
import BuyCoffee from "../BuyCoffee/BuyCoffee";

const Home = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isMetamaskExtenstion, setIsMetamaskExtention] = useState(true);

  const contractAddress = 0x108Ad80b31f2e0518C72dA5f3E18ef176b8b33cE
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
        setIsMetamaskExtention(false);
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

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <div>
      <img className="frappe-logo" src={FrappeLogo} />
      <img className="coffee-logo" src={CoffeeLogo} />
      <h2 className="header">Buy a Coffee</h2>
      {isWalletConnected ? (
        <BuyCoffee />
      ) : (
        <ConnectMetamask onClick={connectWalletBtn} />
      )}
      {!isMetamaskExtenstion ? (
        <Modal
          show={!isMetamaskExtenstion}
          onHide={() => setIsMetamaskExtention(true)}
          centered
        >
          <Modal.Header>
          <Modal.Title className="install-metamask-title">Install MetaMask</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please make sure your browser has MetaMask extension installed</Modal.Body>
          <Modal.Footer>
        <Button onClick={() => setIsMetamaskExtention(true)}>Close</Button>
      </Modal.Footer>
        </Modal>
      ) : null}
    </div>
  );
};

export default Home;
