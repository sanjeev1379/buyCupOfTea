import { useState, useEffect } from "react";

const Transaction = ({state}) => {
    const [transactions, setTransactions] = useState([]);
    const { contract } = state;
    
    useEffect(() => {
        const getAllTransactions = async () => {
            const transact = await contract.getAllTransaction();
            setTransactions(transact);
        }
        contract && getAllTransactions();
    },[contract]);

    return (<>
        <p style={{ textAlign: "center", marginTop: "20px" }}></p>
        {transactions.map((transaction) => {
            return (
                <div
                    className="container-fluid"
                    style={{ width: "100%" }}
                    key={Math.random()}>
                    <table
                        style={{
                        marginBottom: "10px",
                        }}>
                        <tbody>
                            <tr>
                                <td style={{
                                        backgroundColor: "#96D4D4",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "100px",
                                    }}>
                                    {transaction?.name ? transaction?.name : 'N/A'}
                                </td>
                                <td style={{
                                        backgroundColor: "#96D4D4",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "800px",
                                    }}>
                                    {new Date(transaction.timestamp * 1000).toLocaleString()}
                                </td>
                                <td style={{
                                        backgroundColor: "#96D4D4",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "300px",
                                    }}>
                                    {transaction.message ? transaction.message : 'N/A'}
                                </td>
                                <td style={{
                                        backgroundColor: "#96D4D4",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "400px",
                                    }}>
                                    {transaction.from}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        })}
    </>);
}

export default Transaction;