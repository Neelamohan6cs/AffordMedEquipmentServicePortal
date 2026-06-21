import { useState, useEffect } from "react";
import { fetchAllOrders, updateOrder, deleteOrder } from "../../../api/adminApi";
import StatusBadge from "../../../components/StatusBadge";

export default function OrdersList() {
    const [orderList, setOrderList] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await fetchAllOrders();
            setOrderList(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdate = async () => {
        try {
            const res = await updateOrder(editingOrder._id, editingOrder);

            setOrderList(
                orderList.map((order) =>
                    order._id === editingOrder._id ? res.data.data : order
                )
            );

            setEditingOrder(null);
        } catch (error) {
            console.log(error);
            alert("Could not update this order. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this service order? This cannot be undone.")) {
            return;
        }

        try {
            await deleteOrder(id);
            setOrderList(orderList.filter((order) => order._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const visibleOrders = orderList.filter((order) => {
        const matchesSearch = order.hospitalName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <div className="page-header">
                <h1>All Service Orders</h1>
                <p>Every equipment record currently being tracked</p>
            </div>

            <div className="list-toolbar">
                <input
                    type="text"
                    placeholder="Search by hospital name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All statuses</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="orders-table-wrap">
                {loading ? (
                    <p style={{ padding: "20px" }} className="empty-note">Loading orders...</p>
                ) : visibleOrders.length === 0 ? (
                    <p style={{ padding: "20px" }} className="empty-note">No service orders match this view.</p>
                ) : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Hospital</th>
                                <th>Equipment</th>
                                <th>Install Date</th>
                                <th>Service Due</th>
                                <th>Service Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        {order.hospitalName}
                                        <div className="equip-tag">{order.hospitalContact}</div>
                                    </td>
                                    <td>
                                        {order.equipmentName}
                                        <div className="equip-tag">{order.equipmentType}</div>
                                    </td>
                                    <td>{new Date(order.installDate).toLocaleDateString()}</td>
                                    <td>{new Date(order.serviceEndDate).toLocaleDateString()}</td>
                                    <td><StatusBadge status={order.status} /></td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => setEditingOrder(order)}>
                                            Edit
                                        </button>
                                        <button className="action-btn delete" onClick={() => handleDelete(order._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {editingOrder && (
                <div className="modal-backdrop" onClick={() => setEditingOrder(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Equipment Details</h2>

                        <label>Hospital Name</label>
                        <input
                            type="text"
                            value={editingOrder.hospitalName}
                            onChange={(e) =>
                                setEditingOrder({ ...editingOrder, hospitalName: e.target.value })
                            }
                        />

                        <label>Hospital Contact</label>
                        <input
                            type="text"
                            value={editingOrder.hospitalContact}
                            onChange={(e) =>
                                setEditingOrder({ ...editingOrder, hospitalContact: e.target.value })
                            }
                        />

                        <label>Equipment Name</label>
                        <input
                            type="text"
                            value={editingOrder.equipmentName}
                            onChange={(e) =>
                                setEditingOrder({ ...editingOrder, equipmentName: e.target.value })
                            }
                        />

                        <label>Equipment Type</label>
                        <select
                            value={editingOrder.equipmentType}
                            onChange={(e) =>
                                setEditingOrder({ ...editingOrder, equipmentType: e.target.value })
                            }
                        >
                            <option value="ventilator">Ventilator</option>
                            <option value="monitor">Monitor</option>
                            <option value="defibrillator">Defibrillator</option>
                            <option value="other">Other</option>
                        </select>

                        <div className="modal-actions">
                            <button className="btn-ghost" onClick={() => setEditingOrder(null)}>
                                Cancel
                            </button>
                            <button className="btn-primary" onClick={handleUpdate}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
