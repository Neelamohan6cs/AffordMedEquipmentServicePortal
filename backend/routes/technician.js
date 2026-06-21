const express = require("express");
const router = express.Router();

const { getOrders, updateStatus, getDashboardStats,deleteAllOrders } = require("../controllers/technicianController");

router.get("/orders", getOrders);
router.put("/orders/:id/status", updateStatus);


router.delete("/orders/deleteorders",deleteAllOrders);


router.get("/stats", getDashboardStats);

module.exports = router;
