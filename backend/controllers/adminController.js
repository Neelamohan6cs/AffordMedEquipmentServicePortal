const Order = require("../models/order");

const newOrder = async (req, res) => {
    try {
        const {
            hospitalName,
            hospitalAddress,
            hospitalContact,
            equipmentName,
            equipmentType,
            installDate,
            serviceEndDate
        } = req.body;

        // validation (basic)
        if (
            !hospitalName ||
            !hospitalAddress ||
            !hospitalContact ||
            !equipmentName ||
            !equipmentType ||
            !installDate ||
            !serviceEndDate
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // create order in DB
        const order = await Order.create({
            hospitalName,
            hospitalAddress,
            hospitalContact,
            equipmentName,
            equipmentType,
            installDate,
            serviceEndDate
        });

        res.status(201).json({
            message: "Order created successfully",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

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

const orderDelete = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




const orderEdit = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder
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
        const totalOrders = await Order.countDocuments();
        const assigned = await Order.countDocuments({ status: "Assigned" });
        const inProgress = await Order.countDocuments({ status: "In Progress" });
        const completed = await Order.countDocuments({ status: "Completed" });

        const today = new Date();
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);

        const upcomingDue = await Order.find({
            serviceEndDate: { $gte: today, $lte: next30Days }
        })
            .sort({ serviceEndDate: 1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalEquipment: totalOrders,
                totalOrders,
                assigned,
                inProgress,
                completed,
                upcomingDue
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { newOrder,getOrders ,
    orderEdit,
    orderDelete,
    getDashboardStats
};