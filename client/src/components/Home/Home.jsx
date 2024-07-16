import Logo from "../../assets/frappe.png"
import "./Home.css"
import ConnectMetamask from "../ConnectMetamask/ConnectMetamask";

const Home = () => {
    return(
        <div>
            <div className="logo-container">
            <img className="coffee-logo" src={Logo}/>
            </div>
            <h2 className="header">Buy a Coffee</h2>
            <ConnectMetamask />
        </div>
    )
}

export default Home;