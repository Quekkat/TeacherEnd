import { useEffect, useState } from 'react';
import { useStore } from '../globalVariables';
import './TransactionWidget.css';
const TransactionWidget = () => {
    const {history, getTransactionHistory,searchTransactionHistory} = useStore();
    const [search, setSearch] = useState("");
    useEffect(() => {
    getTransactionHistory();
    console.log(history);
    }, []);
    const handleSearch = async () => {
        const data = {
            SEARCH: search,
        };
        await searchTransactionHistory(data);
    };

    // Also search when pressing Enter in the input field
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="transaction-container">
            <h1 className="transaction-title">Transaction History</h1>
            <div className="transaction-search-bar-row">
                <input
                    type="text"
                    placeholder="Search by date, description or name..."
                    className="transaction-search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button 
                    className="transaction-search-btn"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <div className="transaction-cards-center">
                {history && history.map((tx) => (
                    <div className="transaction-card" key={tx._id}>
                        <div className="transaction-date">{tx.createdAt}</div>
                        <div className="transaction-details">
                            <div className="transaction-desc">{tx.message}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionWidget;