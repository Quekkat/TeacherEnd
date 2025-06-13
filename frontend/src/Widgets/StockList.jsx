import './StockList.css';

const StockList = () => {
    return (
        <div className="stocklist-table-card">
            <table className="stocklist-table">
                <caption>Table List</caption>
                <thead>
                    <tr>
                        <th>Uniform Name</th>
                        <th>Sold</th>
                        <th>Ordered</th>
                        <th>Available</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="row-label available">Uniform</td>
                        <td><input type="number" value={5} readOnly /></td>
                        <td><input type="number" value={4} readOnly /></td>
                        <td><input type="number" value={7} readOnly /></td>
                        <td><input type="number" value={16} readOnly /></td>
                    </tr>
                    <tr>
                        <td className="row-label sold">P.E Uniform</td>
                        <td><input type="number" value={5} readOnly /></td>
                        <td><input type="number" value={5} readOnly /></td>
                        <td><input type="number" value={5} readOnly /></td>
                        <td><input type="number" value={15} readOnly /></td>
                    </tr>
                    <tr>
                        <td className="row-label ordered">Event T-shirt</td>
                        <td><input type="number" value={2} readOnly /></td>
                        <td><input type="number" value={2} readOnly /></td>
                        <td><input type="number" value={2} readOnly /></td>
                        <td><input type="number" value={6} readOnly /></td>
                    </tr>
                    <tr className="stocklist-total-row">
                        <td className="total-label">TOTAL:</td>
                        <td colSpan={4} className="total-value">
                            <input type="number" value={37} readOnly />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default StockList;