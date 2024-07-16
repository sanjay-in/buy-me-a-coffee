import { useState } from "react";
import { ethers } from "ethers";
import FrappeLogo from "../../assets/frappe.png"
import CoffeeLogo from "../../assets/coffee1.png"
import "./Home.css"
import ConnectMetamask from "../ConnectMetamask/ConnectMetamask";
import BuyCoffee from "../BuyCoffee/BuyCoffee";

const Home = () => {
   
    return(
        <div>
            <img className="frappe-logo" src={FrappeLogo}/>
            <img className="coffee-logo" src={CoffeeLogo}/>
            <h2 className="header">Buy a Coffee</h2>
            {/* <ConnectMetamask /> */}
            <BuyCoffee />
        </div>
    )
}

export default Home;