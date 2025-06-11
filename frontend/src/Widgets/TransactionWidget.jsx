import './TransactionWidget.css';

const transactions = [
    {
        date: "2025-06-11",
        description: "Paid tuition fee for 1st Semester - Juan Dela Cruz"
    },
    {
        date: "2025-06-10",
        description: "Purchased school uniform - Maria Santos"
    },
    {
        date: "2025-06-09",
        description: "Paid library fine - Jose Reyes"
    },
    {
        date: "2025-06-08",
        description: "Paid for field trip - Ana Lopez"
    },
    {
        date: "2025-06-07",
        description: "Bought Science Project materials - Pedro Garcia"
    },
    {
        date: "2025-06-06",
        description: "Paid graduation fee - Luisa Torres"
    },
    {
        date: "2025-06-05",
        description: "Paid miscellaneous fees - Juan Dela Cruz"
    },
    {
        date: "2025-06-04",
        description: "Paid for PE uniform - Maria Santos"
    }
];

const TransactionWidget = () => {
    return (
        <div className="transaction-container">
            <div className="transaction-search-bar-row">
                <input
                    type="text"
                    placeholder="Search by date or description..."
                    className="transaction-search-input"
                />
                <button className="transaction-search-btn">Search</button>
            </div>
            <div className="transaction-cards-center">
                {transactions.map((tx, idx) => (
                    <div className="transaction-card" key={idx}>
                        <div className="transaction-date">{tx.date}</div>
                        <div className="transaction-desc">{tx.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionWidget;