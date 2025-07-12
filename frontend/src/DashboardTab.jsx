import { useState, useEffect } from "react";
import { useStore } from "./globalVariables";
import logo from "./DashboardLogo/logo.png";

const DashboardTab = () => {
  const { setWidgetTab, logout, theme, toggleTheme, authUser} = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (tab) => {
    setWidgetTab(tab);
    setIsMenuOpen(false); // Close menu when item is clicked
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-5 left-5 z-20 bg-[#151A2E] dark:bg-gray-800 text-white w-12 h-12 rounded-full cursor-pointer shadow-lg flex items-center justify-center hover:bg-[#4f6cff] transition-colors duration-300"
        onClick={toggleMenu}
      >
        <span className="material-symbols-rounded text-2xl">menu</span>
      </button>

      <aside
        className={`fixed top-0 left-0 w-72 h-screen bg-[#151A2E] dark:bg-gray-900 z-10 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <header className="flex items-center justify-between p-6 border-b border-white/10 dark:border-gray-700">
          <a href="#" className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-10 rounded-full object-contain"
            />
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                theme === "light" ? "bg-yellow-400" : "bg-gray-700"
              }`}
            >
              <span
                className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
                  theme === "light" ? "translate-x-8" : "translate-x-0"
                }`}
              >
                <span className="material-symbols-rounded text-gray-800">
                  {theme === "light" ? "light_mode" : "dark_mode"}
                </span>
              </span>
            </button>
            <button className="lg:hidden text-white dark:text-gray-300" onClick={toggleMenu}>
              <span className="material-symbols-rounded text-2xl">close</span>
            </button>
          </div>
        </header>

        <nav className="mt-4">
          <ul className="flex flex-col gap-0.5 px-4">
            <li className="w-full">
              <button
                className="w-full flex items-center gap-3 py-3 px-4 text-white dark:text-gray-300 rounded-lg hover:bg-gray-100 hover:text-[#151A2E] dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-300"
                onClick={() => handleNavClick("inventory-dashboard")}
              >
                <span className="material-symbols-rounded">inventory</span>
                <span className="font-medium">Inventory Dashboard</span>
              </button>
            </li>

            <li className="w-full">
              <button
                className="w-full flex items-center gap-3 py-3 px-4 text-white dark:text-gray-300 rounded-lg hover:bg-gray-100 hover:text-[#151A2E] dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-300"
                onClick={() => handleNavClick("add-new-inventory")}
              >
                <span className="material-symbols-rounded">add_box</span>
                <span className="font-medium">Add new item</span>
              </button>
            </li>


              {authUser.superadmin && (
              <li className="w-full">
              <button
                className="w-full flex items-center gap-3 py-3 px-4 text-white dark:text-gray-300 rounded-lg hover:bg-gray-100 hover:text-[#151A2E] dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-300"
                onClick={() => handleNavClick("teachers")}
              >
                <span className="material-symbols-rounded">manage_accounts</span>
                <span className="font-medium">Admin List</span>
              </button>
              </li>
            )}
            <li className="w-full mt-8 border-t border-white/10 dark:border-gray-700 pt-4">
              <button
                className="w-full flex items-center gap-3 py-3 px-4 text-white dark:text-gray-300 rounded-lg hover:bg-red-500/20 hover:text-red-400 dark:hover:bg-red-500/30 dark:hover:text-red-300 transition-colors duration-300"
                onClick={logout}
              >
                <span className="material-symbols-rounded">logout</span>
                <span className="font-medium">Log Out</span>
              </button>
            </li>
            
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashboardTab;
