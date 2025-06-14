import { useState } from "react";
import { useStore } from "./globalVariables";
import logo from "./DashboardLogo/logo.png";
import "./DashboardTab.css";

const DashboardTab = () => {
  const { setWidgetTab,logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (tab) => {
    setWidgetTab(tab);
    setIsMenuOpen(false); // Close menu when item is clicked
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="material-symbols-rounded">menu</span>
      </button>

      <aside className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
        <header className="sidebar-header">
          <a href="#" className="header-logo">
            <img src={logo} alt="logo" />
          </a>
          <button className="close-menu" onClick={toggleMenu}>
            <span className="material-symbols-rounded">close</span>
          </button>
        </header>

        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick("inventory")}>
                <span className="material-symbols-rounded">inventory</span>
                <span className="nav-label">Inventory</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick("add-new")}>
                <span className="material-symbols-rounded">add_circle</span>
                <span className="nav-label">Add New</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick("verify-teachers")}>
                <span className="material-symbols-rounded">verified</span>
                <span className="nav-label">Verify Teachers</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick("verify-payment")}>
                <span className="material-symbols-rounded">payments</span>
                <span className="nav-label">Verify Payment</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick("transaction-history")}>
                <span className="material-symbols-rounded">receipt_long</span>
                <span className="nav-label">Transaction History</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick("verify-student")}>
                <span className="material-symbols-rounded">local_library</span>
                <span className="nav-label">Verify Student</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick("add-new-payment")}>
                <span className="material-symbols-rounded">add_shopping_cart</span>
                <span className="nav-label">Add New Payment</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick("stock-list")}>
                <span className="material-symbols-rounded">warehouse</span>
                <span className="nav-label">Stock List</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={logout}>
                <span className="material-symbols-rounded">logout</span>
                <span className="nav-label">Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashboardTab;
