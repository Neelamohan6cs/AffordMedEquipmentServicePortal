const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    hospitalName: String,
    hospitalAddress: String,
    hospitalContact: String,
    equipmentName: String,
    equipmentType: String,
    installDate: Date,
    serviceEndDate: Date,

    status: {
        type: String,
        enum: ["Assigned", "In Progress", "Completed"],
        default: "Assigned"
    },

    serviceRemarks: {
        type: String,
        default: ""
    },

    handledBy: {
        type: String,
        default: ""
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);