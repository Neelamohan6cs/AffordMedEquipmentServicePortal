import { useEffect, useState } from "react";
import { fetchTechnicianStats, fetchServiceOrders } from "../../../api/technicianApi";
import StatusTracker from "../../../components/StatusTracker";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    const loadStats = async () => {
        try {
            const res = await fetchTechnicianStats();
            setStats(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loadOrders = async () => {
        try {
            const res = await fetchServiceOrders();
            setOrders(res.data.data);
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

    // Show the orders that still need attention first (Assigned, then In Progress), most recent few
    const priorityOrder = { "Assigned": 0, "In Progress": 1, "Completed": 2 };
    const recentOrders = [...orders]
        .sort((a, b) => priorityOrder[a.status] - priorityOrder[b.status])
        .slice(0, 5);

    return (
        <div>
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Your service queue at a glance</p>
            </div>

            <div className="tech-stat-grid">
                <div className="tech-stat-card">
                    <div className="stat-value">{stats.assigned}</div>
                    <div className="stat-label">Assigned Orders</div>
                </div>
                <div className="tech-stat-card">
                    <div className="stat-value">{stats.inProgress}</div>
                    <div className="stat-label">In Progress Orders</div>
                </div>
                <div className="tech-stat-card accent">
                    <div className="stat-value">{stats.completed}</div>
                    <div className="stat-label">Completed Orders</div>
                </div>
            </div>

            {/* NEW: Recent Service Orders */}
            <div className="dashboard-section">
                <h2>Recent Service Orders</h2>

                {ordersLoading ? (
                    <p className="empty-note">Loading orders...</p>
                ) : recentOrders.length === 0 ? (
                    <p className="empty-note">No service orders assigned to you yet.</p>
                ) : (
                    <div className="order-card-list">
                        {recentOrders.map((order) => (
                            <div className="order-card" key={order._id}>
                                <div className="order-card-main">
                                    <div className="order-card-hospital">{order.hospitalName}</div>
                                    <div className="order-card-sub">
                                        {order.equipmentName} &middot; {order.equipmentType}
                                    </div>

                                    <div className="order-card-meta">
                                        <span>Install: {new Date(order.installDate).toLocaleDateString()}</span>
                                        <span>Due: {new Date(order.serviceEndDate).toLocaleDateString()}</span>
                                    </div>

                                    <div style={{ marginTop: "14px" }}>
                                        <StatusTracker status={order.status} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}