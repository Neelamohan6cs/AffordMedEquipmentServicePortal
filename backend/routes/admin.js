const express = require("express");
const router=express.Router();

const { newOrder ,getOrders,orderDelete,orderEdit,getDashboardStats} = require("../controllers/adminController");

router.post("/order",newOrder);

router.get("/orders",getOrders)
router.get("/stats",getDashboardStats)

router.put("/orders/:id", orderEdit);
router.delete("/orders/:id", orderDelete);


module.exports=router;