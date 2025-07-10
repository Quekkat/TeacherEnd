import InventoryDashboardCard from "./InventoryDashboardCard";

const InventoryDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 mb-4">
              Vision Academy Inventory System
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Inventory Management
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose your school level to access and manage inventory items efficiently
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grade Level Selection */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Select Your Grade Level
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Click on any level below to access its inventory management
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <InventoryDashboardCard DISPLAYTEXT={"KINDERGARTEN"} LEVELDESTINATION={"kindergarten"} />
            <InventoryDashboardCard DISPLAYTEXT={"ELEMENTARY"} LEVELDESTINATION={"elementary"} />
            <InventoryDashboardCard DISPLAYTEXT={"JUNIOR HIGHSCHOOL"} LEVELDESTINATION={"JHS"} />
            <InventoryDashboardCard DISPLAYTEXT={"SENIOR HIGHSCHOOL"} LEVELDESTINATION={"SHS"} />
            <InventoryDashboardCard DISPLAYTEXT={"COLLEGE"} LEVELDESTINATION={"college"} />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              System Overview
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time statistics of your inventory management system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
                <span className="material-symbols-rounded text-white text-2xl">inventory_2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Total Items</h4>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">-</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Across all levels</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-4">
                <span className="material-symbols-rounded text-white text-2xl">school</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Active Levels</h4>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">5</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Grade levels available</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-4">
                <span className="material-symbols-rounded text-white text-2xl">update</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Last Updated</h4>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Today</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">System sync status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;