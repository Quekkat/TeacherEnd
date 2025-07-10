import InventoryDashboardCard from "./InventoryDashboardCard";

const InventoryDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Inventory Management Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Select a school level to manage inventory
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Navigation Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                Select Grade Level
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <InventoryDashboardCard DISPLAYTEXT={"KINDERGARTEN"} LEVELDESTINATION={"kindergarten"} />
              <InventoryDashboardCard DISPLAYTEXT={"ELEMENTARY"} LEVELDESTINATION={"elementary"} />
              <InventoryDashboardCard DISPLAYTEXT={"JUNIOR HIGHSCHOOL"} LEVELDESTINATION={"JHS"} />
              <InventoryDashboardCard DISPLAYTEXT={"SENIOR HIGHSCHOOL"} LEVELDESTINATION={"SHS"} />
              <InventoryDashboardCard DISPLAYTEXT={"COLLEGE"} LEVELDESTINATION={"college"} />
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <span className="material-symbols-rounded text-blue-600 dark:text-blue-400 text-2xl">inventory_2</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <span className="material-symbols-rounded text-green-600 dark:text-green-400 text-2xl">trending_up</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Levels</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <span className="material-symbols-rounded text-purple-600 dark:text-purple-400 text-2xl">analytics</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;