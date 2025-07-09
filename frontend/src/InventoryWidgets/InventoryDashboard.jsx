import InventoryDashboardCard from "./InventoryDashboardCard";

const InventoryDashboard = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-8">
      <InventoryDashboardCard DISPLAYTEXT={"KINDERGARTEN"} LEVELDESTINATION={"kindergarten"} />
      <InventoryDashboardCard DISPLAYTEXT={"ELEMENTARY"} LEVELDESTINATION={"elementary"} />
      <InventoryDashboardCard DISPLAYTEXT={"JUNIOR HIGHSCHOOL"} LEVELDESTINATION={"JHS"} />
      <InventoryDashboardCard DISPLAYTEXT={"SENIOR HIGHSCHOOL"} LEVELDESTINATION={"SHS"} />
      <InventoryDashboardCard DISPLAYTEXT={"COLLEGE"} LEVELDESTINATION={"college"} />
    </div>
  );
};

export default InventoryDashboard;