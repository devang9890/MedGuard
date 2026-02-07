import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getDashboardStats();
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">MedGuard Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h3>Total Supplies</h3>
          <p className="text-xl font-bold">{stats.totalSupplies}</p>
        </div>

        <div className="bg-green-100 shadow p-4 rounded">
          <h3>Accepted</h3>
          <p className="text-xl font-bold">{stats.accepted}</p>
        </div>

        <div className="bg-yellow-100 shadow p-4 rounded">
          <h3>Warnings</h3>
          <p className="text-xl font-bold">{stats.warning}</p>
        </div>

        <div className="bg-red-100 shadow p-4 rounded">
          <h3>Rejected</h3>
          <p className="text-xl font-bold">{stats.rejected}</p>
        </div>
      </div>
    </div>
  );
}
