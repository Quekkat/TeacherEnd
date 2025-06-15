import { useState } from 'react';
import './TransactionWidget.css';

// Updated data structure to separate description and person name
const transactions = [
    {
        date: "2025-06-11",
        description: "Paid tuition fee for 1st Semester",
        person: "Juan Dela Cruz"
    },
    {
        date: "2025-06-10",
        description: "Purchased school uniform",
        person: "Maria Santos"
    },
    {
        date: "2025-06-09",
        description: "Paid library fine",
        person: "Jose Reyes"
    },
    {
        date: "2025-06-08",
        description: "Paid for field trip",
        person: "Ana Lopez"
    },
    {
        date: "2025-06-07",
        description: "Bought Science Project materials",
        person: "Pedro Garcia"
    },
    {
        date: "2025-06-06",
        description: "Paid graduation fee",
        person: "Luisa Torres"
    },
    {
        date: "2025-06-05",
        description: "Paid miscellaneous fees",
        person: "Juan Dela Cruz"
    },
    {
        date: "2025-06-04",
        description: "Paid for PE uniform",
        person: "Maria Santos"
    }
];

const TransactionWidget = () => {
    const [search, setSearch] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearch = () => {
        if (!search.trim()) {
            // If search is empty, show all transactions
            setFilteredTransactions(transactions);
            setIsSearchActive(false);
            return;
        }

        // Filter transactions by date, description or person
        const searchLower = search.toLowerCase();
        const filtered = transactions.filter(
            tx => 
                tx.date.toLowerCase().includes(searchLower) || 
                tx.description.toLowerCase().includes(searchLower) ||
                tx.person.toLowerCase().includes(searchLower)
        );
        
        setFilteredTransactions(filtered);
        setIsSearchActive(true);
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

            {/* No results message */}
            {isSearchActive && filteredTransactions.length === 0 && (
                <div className="no-results">No transactions found matching "{search}"</div>
            )}

            <div className="transaction-cards-center">
                {filteredTransactions.map((tx, idx) => (
                    <div className="transaction-card" key={idx}>
                        <div className="transaction-date">{tx.date}</div>
                        <div className="transaction-details">
                            <div className="transaction-desc">{tx.description}</div>
                            <div className="transaction-person">{tx.person}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionWidget;