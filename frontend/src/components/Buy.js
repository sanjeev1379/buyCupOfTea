import { ethers } from "ethers";
import { useState } from "react";

const Buy = ({state}) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const buyACupOfTea = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const donate = {
            value: ethers.utils.parseEther('0.001')
        }
        const transaction = await contract.buyCupOfTea(name, message, donate)
        await transaction.wait();
        console.log("Transcation Successfully Completed");
    }

    return (<div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyACupOfTea}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Your Name"
                    onChange={(event)=>setName(event.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Message</label>
                <input
                    type="text"
                    className="form-control"
                    id="message"
                    placeholder="Enter Your Message"
                    onChange={(event)=>setMessage(event.target.value)}
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                disabled={!state.contract}>
                Pay Now
            </button>
        </form>
    </div>
    );
}

export default Buy;