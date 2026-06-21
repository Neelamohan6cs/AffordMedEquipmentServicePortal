const Order = require("../models/order");

const statusOrder = ["Assigned", "In Progress", "Completed"];

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};







const deleteAllOrders = async (req, res) => {
    try {
        const result = await Order.deleteMany({});

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} orders deleted successfully`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const updateStatus = async (req, res) => {
    try {
        const { status, serviceRemarks, handledBy } = req.body;

        if (!statusOrder.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const currentIndex = statusOrder.indexOf(order.status);
        const nextIndex = statusOrder.indexOf(status);

        // only allow moving one step forward, never skipping or going back
        if (nextIndex !== currentIndex + 1) {
            return res.status(400).json({
                success: false,
                message: `Cannot move status from "${order.status}" to "${status}"`
            });
        }

        if (status === "Completed" && (!serviceRemarks || !serviceRemarks.trim())) {
            return res.status(400).json({
                success: false,
                message: "Service remarks are required to mark a service as completed"
            });
        }

        order.status = status;
        if (serviceRemarks) order.serviceRemarks = serviceRemarks;
        if (handledBy) order.handledBy = handledBy;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Status updated",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const assigned = await Order.countDocuments({ status: "Assigned" });
        const inProgress = await Order.countDocuments({ status: "In Progress" });
        const completed = await Order.countDocuments({ status: "Completed" });

        res.status(200).json({
            success: true,
            data: { assigned, inProgress, completed }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getOrders, updateStatus, getDashboardStats ,deleteAllOrders};
