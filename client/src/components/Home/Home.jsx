import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
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
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isMetamaskExtenstionError, setIsMetamaskExtentionError] = useState(false);
  const [isBuyingCoffeeError, setIsBuyingCoffeeError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const [memos, setMemos] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const contractAddress = "0x108Ad80b31f2e0518C72dA5f3E18ef176b8b33cE";

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
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
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const buyMeACoffe = new Contract(contractAddress, ABI, signer);

        const coffeeTxn = await buyMeACoffe.buyCoffee(name, message, { value: ethers.parseEther(amount) });
        coffeeTxn.wait().then(() => setIsSuccess(true));
      }
    } catch (error) {
      setIsBuyingCoffeeError(true);
      setIsBuyingCoffee(false);
      console.log(error);
    }
  };

  const getAllMemos = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const buyMeACoffee = new Contract(contractAddress, ABI, signer);
        const memos = await buyMeACoffee.getAllMemos();
        let memoArray = [];
        memos &&
          memos.forEach((memo) => {
            const [address, name, message, amount, timestamp] = memo;
            memoArray.push({
              address,
              name,
              message,
              amount,
              timestamp,
            });
          });
        const sortedMemo =
          memoArray &&
          memoArray.sort((a, b) => {
            if (a.timestamp < b.timestamp) return -1;
            if (a.timestamp > b.timestamp) return -1;
            return 0;
          });
        setMemos(sortedMemo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOwner = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const buyMeACoffee = new ethers.Contract(contractAddress, ABI, signer);
        const contractOwner = await buyMeACoffee.getOwner();
        if (contractOwner === signer.address) {
          setIsOwner(true);
        } else if (isOwner) {
          setIsOwner(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const withdraw = async () => {
    setIsWithdrawing(true);
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const buyMeACoffe = new Contract(contractAddress, ABI, signer);

        const coffeeTxn = await buyMeACoffe.withdraw();
        coffeeTxn.wait().then(() => {
          setIsWithdrawing(false);
          setIsWithdrawn(true);
        });
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
    } else if (modalName === "withdraw") {
      setIsWithdrawn(false);
    }
  };

  useEffect(() => {
    if (isFirstRender) {
      connectWallet();
      getOwner();
      getAllMemos();
      setIsFirstRender(false);
    }
    window.ethereum?.on("accountsChanged", () => {
      getOwner();
    });
  }, [isOwner]);
  return (
    <div>
      <img className="frappe-logo" src={FrappeLogo} />
      <img className="coffee-logo" src={CoffeeLogo} />
      <h2 className="header">Buy a Coffee</h2>
      {isWalletConnected ? (
        <BuyCoffee
          isBuyingCoffee={isBuyingCoffee}
          onClick={buyCoffee}
          memos={memos}
          isOwner={isOwner}
          isWithdrawing={isWithdrawing}
          withdraw={withdraw}
        />
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
      ) : isSuccess ? (
        <Modal
          show={isSuccess}
          onClose={handleModalOnClose}
          type="success"
          title="Transaction Successful✅"
          message="I'm grateful for your generosity in contributing. Thank you for your support🤝"
        />
      ) : isWithdrawn ? (
        <Modal
          show={isWithdrawn}
          onClose={handleModalOnClose}
          type="withdraw"
          title="Success✅"
          message="Funds have been transfered to your account. Please check your account balance to confirm."
        />
      ) : null}
    </div>
  );
};

export default Home;
