import { useEffect, useState } from "react";
import { fetchAdminStats, fetchAllOrders } from "../../../api/adminApi";
import StatusBadge from "../../../components/StatusBadge";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(true);

    const loadStats = async () => {
        try {
            const res = await fetchAdminStats();
            setStats(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loadOrders = async () => {
        try {
            const res = await fetchAllOrders();
            setOrderList(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setOrdersLoading(false);
        }
    };

    useEffect(() => {
        loadStats();
        loadOrders();
    }, []);

    if (loading) {
        return <p className="empty-note">Loading dashboard...</p>;
    }

    if (!stats) {
        return <p className="empty-note">Could not load dashboard data right now.</p>;
    }

    return (
        <div>
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Overview of equipment installations and service activity</p>
            </div>

            <div className="stat-grid">
                <div className="stat-card">
                    <div className="stat-value">{stats.totalEquipment}</div>
                    <div className="stat-label">Total Equipment</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.totalOrders}</div>
                    <div className="stat-label">Total Service Orders</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.assigned}</div>
                    <div className="stat-label">Assigned</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.inProgress}</div>
                    <div className="stat-label">In Progress</div>
                </div>
                <div className="stat-card accent">
                    <div className="stat-value">{stats.completed}</div>
                    <div className="stat-label">Completed</div>
                </div>
            </div>

            {/* Installed Equipment Details — now pulled from fetchAllOrders, same as OrdersList */}
            <div className="dashboard-section">
                <h2>Installed Equipment Details</h2>

                {ordersLoading ? (
                    <p className="empty-note">Loading equipment...</p>
                ) : orderList.length === 0 ? (
                    <p className="empty-note">No equipment installations recorded yet.</p>
                ) : (
                    <div className="orders-table-wrap">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Hospital</th>
                                    <th>Contact</th>
                                    <th>Equipment</th>
                                    <th>Type</th>
                                    <th>Install Date</th>
                                    <th>Service Due</th>
                                    <th>Service Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.hospitalName}</td>
                                        <td>{order.hospitalContact}</td>
                                        <td>{order.equipmentName}</td>
                                        <td>{order.equipmentType}</td>
                                        <td>
                                            {order.installDate
                                                ? new Date(order.installDate).toLocaleDateString()
                                                : "—"}
                                        </td>
                                        <td>
                                            {order.serviceEndDate
                                                ? new Date(order.serviceEndDate).toLocaleDateString()
                                                : "—"}
                                        </td>
                                        <td><StatusBadge status={order.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="dashboard-section">
                <h2>Upcoming Service Due Dates</h2>

                {stats.upcomingDue.length === 0 ? (
                    <p className="empty-note">Nothing due for service in the next 30 days.</p>
                ) : (
                    <div className="due-list">
                        {stats.upcomingDue.map((order) => (
                            <div className="due-row" key={order._id}>
                                <div>
                                    <div className="due-row-hospital">{order.hospitalName}</div>
                                    <div className="due-row-equipment">{order.equipmentName}</div>
                                </div>
                                <div className="due-row-date">
                                    {new Date(order.serviceEndDate).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}