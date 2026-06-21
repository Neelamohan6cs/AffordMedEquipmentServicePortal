import client from "./client";

export const createOrder = (orderData) => {
    return client.post("/api/admin/order", orderData);
};

export const fetchAllOrders = () => {
    return client.get("/api/admin/orders");
};

export const updateOrder = (id, orderData) => {
    return client.put(`/api/admin/orders/${id}`, orderData);
};

export const deleteOrder = (id) => {
    return client.delete(`/api/admin/orders/${id}`);
};

export const fetchAdminStats = () => {
    return client.get("/api/admin/stats");
};
