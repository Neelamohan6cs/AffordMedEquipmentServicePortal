import { useEffect, useState } from "react";
import { fetchServiceOrders, updateOrderStatus } from "../../../api/technicianApi";
import { useAuth } from "../../../context/AuthContext";
import StatusTracker from "../../../components/StatusTracker";

export default function AssignedOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Assigned"); // CHANGED: default to a real status, not "All"
    const [remarksDraft, setRemarksDraft] = useState({});
    const [working, setWorking] = useState(null);

    const { user } = useAuth();

    const loadOrders = async () => {
        try {
            const res = await fetchServiceOrders();
            setOrders(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStart = async (order) => {
        setWorking(order._id);
        try {
            const res = await updateOrderStatus(order._id, {
                status: "In Progress",
                handledBy: user?.name
            });

            setOrders(orders.map((o) => (o._id === order._id ? res.data.data : o)));
        } catch (error) {
            console.log(error);
            alert("Could not start this service order.");
        } finally {
            setWorking(null);
        }
    };

    const handleComplete = async (order) => {
        const remarks = (remarksDraft[order._id] || "").trim();

        if (!remarks) {
            alert("Add a service remark before marking this order as completed.");
            return;
        }

        setWorking(order._id);
        try {
            const res = await updateOrderStatus(order._id, {
                status: "Completed",
                serviceRemarks: remarks,
                handledBy: user?.name
            });

            setOrders(orders.map((o) => (o._id === order._id ? res.data.data : o)));
        } catch (error) {
            console.log(error);
            alert("Could not complete this service order.");
        } finally {
            setWorking(null);
        }
    };

    // CHANGED: no more "All" passthrough — always filter by exact status
    const visibleOrders = orders.filter((order) => order.status === filter);

    return (
        <div>
            <div className="page-header">
                <h1>Service Orders</h1>
                <p>Move equipment through the service workflow</p>
            </div>

            <div className="tech-filter-row">
                {/* CHANGED: removed "All" from the options */}
                {["Assigned", "In Progress", "Completed"].map((option) => (
                    <button
                        key={option}
                        className={filter === option ? "active" : ""}
                        onClick={() => setFilter(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="empty-note">Loading service orders...</p>
            ) : visibleOrders.length === 0 ? (
                <p className="empty-note">No service orders in this view.</p>
            ) : (
                <div className="order-card-list">
                    {visibleOrders.map((order) => (
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

                                {order.status === "Completed" && order.serviceRemarks && (
                                    <div className="order-card-remarks">
                                        <strong>Remarks:</strong> {order.serviceRemarks}
                                    </div>
                                )}
                            </div>

                            <div className="order-card-actions">
                                {order.status === "Assigned" && (
                                    <button
                                        className="tech-action-btn start"
                                        disabled={working === order._id}
                                        onClick={() => handleStart(order)}
                                    >
                                        {working === order._id ? "Starting..." : "Start Service"}
                                    </button>
                                )}

                                {order.status === "In Progress" && (
                                    <div className="remarks-box">
                                        <textarea
                                            placeholder="What was done? (required to complete)"
                                            value={remarksDraft[order._id] || ""}
                                            onChange={(e) =>
                                                setRemarksDraft({
                                                    ...remarksDraft,
                                                    [order._id]: e.target.value
                                                })
                                            }
                                        />
                                        <button
                                            className="tech-action-btn complete"
                                            style={{ marginTop: "8px", width: "100%" }}
                                            disabled={working === order._id}
                                            onClick={() => handleComplete(order)}
                                        >
                                            {working === order._id ? "Saving..." : "Mark Completed"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}