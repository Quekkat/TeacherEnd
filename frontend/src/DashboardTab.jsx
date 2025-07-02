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
              <button className="nav-link" onClick={()=> handleNavClick("inventory-dashboard")}>
                <span className="material-symbols-rounded">inventory</span>
                <span className="nav-label">Inventory Dashboard</span>
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link" onClick={()=> handleNavClick("add-new-inventory")}>
                <span className="material-symbols-rounded">inventory</span>
                <span className="nav-label"> Add new item</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={()=> handleNavClick("order-list")}>
                <span className="material-symbols-rounded">inventory</span>
                <span className="nav-label"> Order list</span>
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
