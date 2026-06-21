import client from "./client";

export const fetchServiceOrders = () => {
    return client.get("/api/technician/orders");
};

export const updateOrderStatus = (id, payload) => {
    return client.put(`/api/technician/orders/${id}/status`, payload);
};

export const fetchTechnicianStats = () => {
    return client.get("/api/technician/stats");
};
