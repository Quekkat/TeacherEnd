import { useStore } from "./globalVariables";
import logo from "./DashboardLogo/logo.png";
import "./DashboardTab.css";

const DashboardTab = () => {
  const { setWidgetTab } = useStore();

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <a href="#" className="header-logo">
          <img src={logo} alt="logo" />
        </a>
      </header>

      <nav className="sidebar-nav">
        <ul className="nav-list primary-nav">
          <li className="nav-item">
            <button className="nav-link" onClick={() => setWidgetTab("inventory")}>
              <span className="material-symbols-rounded">inventory</span>
              <span className="nav-label">Inventory</span>
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setWidgetTab("add-new")}>
              <span className="material-symbols-rounded">add_circle</span>
              <span className="nav-label">Add New</span>
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setWidgetTab("verify-teachers")}>
              <span className="material-symbols-rounded">verified</span>
              <span className="nav-label">Verify Teachers</span>
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setWidgetTab("verify-payment")}>
              <span className="material-symbols-rounded">payments</span>
              <span className="nav-label">Verify Payment</span>
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setWidgetTab("transaction-history")}>
              <span className="material-symbols-rounded">receipt_long</span>
              <span className="nav-label">Transaction History</span>
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setWidgetTab("verify-student")}>
              <span className="material-symbols-rounded">local_library</span>
              <span className="nav-label">Verify Student</span>
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setWidgetTab("add-new-payment")}>
              <span className="material-symbols-rounded">add_shopping_cart</span>
              <span className="nav-label">Add New Payment</span>
            </button>
          </li>
        </ul>

        <ul className="nav-list secondary-nav">
          <li className="nav-item">
            <button className="nav-link">
              <span className="material-symbols-rounded">logout</span>
              <span className="nav-label">Log Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardTab;
