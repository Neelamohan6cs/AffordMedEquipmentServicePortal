const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Order = require("../models/order");

dotenv.config({
    path: path.join(__dirname, "../.env")
});

console.log("MONGO_DB =", process.env.MONGO_DB);

function daysFromNow(n) {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d;
}

async function seedOrders() {
    try {
        await mongoose.connect(process.env.MONGO_DB);

        console.log("MongoDB Connected");

        await Order.deleteMany();

        await Order.insertMany([
            {
                hospitalName: "Apollo Hospital",
                hospitalAddress: "Greams Road, Chennai",
                hospitalContact: "9876543210",
                equipmentName: "Heart Monitor",
                equipmentType: "monitor",
                installDate: new Date("2025-01-15"),
                serviceEndDate: daysFromNow(5),
                status: "Assigned"
            },
            {
                hospitalName: "Fortis Hospital",
                hospitalAddress: "Bannerghatta Road, Bangalore",
                hospitalContact: "9876543211",
                equipmentName: "Ventilator X1",
                equipmentType: "ventilator",
                installDate: new Date("2025-02-10"),
                serviceEndDate: daysFromNow(12),
                status: "In Progress",
                handledBy: "Technician"
            },
            {
                hospitalName: "CMC Hospital",
                hospitalAddress: "IDA Scudder Road, Vellore",
                hospitalContact: "9876543212",
                equipmentName: "Defibrillator Pro",
                equipmentType: "defibrillator",
                installDate: new Date("2025-03-20"),
                serviceEndDate: daysFromNow(-3),
                status: "Completed",
                serviceRemarks: "Battery replaced and calibration verified.",
                handledBy: "Technician"
            },
            {
                hospitalName: "Kauvery Hospital",
                hospitalAddress: "Cantonment, Trichy",
                hospitalContact: "9876543213",
                equipmentName: "Patient Monitor",
                equipmentType: "monitor",
                installDate: new Date("2025-04-05"),
                serviceEndDate: daysFromNow(20),
                status: "Assigned"
            },
            {
                hospitalName: "MIOT Hospital",
                hospitalAddress: "Manapakkam, Chennai",
                hospitalContact: "9876543214",
                equipmentName: "ICU Ventilator",
                equipmentType: "ventilator",
                installDate: new Date("2025-05-01"),
                serviceEndDate: daysFromNow(2),
                status: "In Progress",
                handledBy: "Technician"
            },
            {
                hospitalName: "SRM Medical College",
                hospitalAddress: "Potheri, Chennai",
                hospitalContact: "9876543215",
                equipmentName: "Cardiac Monitor",
                equipmentType: "monitor",
                installDate: new Date("2025-06-10"),
                serviceEndDate: daysFromNow(45),
                status: "Assigned"
            },
            {
                hospitalName: "Global Health City",
                hospitalAddress: "Perumbakkam, Chennai",
                hospitalContact: "9876543216",
                equipmentName: "Defibrillator",
                equipmentType: "defibrillator",
                installDate: new Date("2025-07-15"),
                serviceEndDate: daysFromNow(-10),
                status: "Completed",
                serviceRemarks: "Pads replaced, unit tested on load.",
                handledBy: "Technician"
            },
            {
                hospitalName: "Aster Medcity",
                hospitalAddress: "Kuttisahib Road, Kochi",
                hospitalContact: "9876543217",
                equipmentName: "Emergency Ventilator",
                equipmentType: "ventilator",
                installDate: new Date("2025-08-08"),
                serviceEndDate: daysFromNow(8),
                status: "Assigned"
            },
            {
                hospitalName: "Government General Hospital",
                hospitalAddress: "Panagal Road, Madurai",
                hospitalContact: "9876543218",
                equipmentName: "Heart Monitor",
                equipmentType: "monitor",
                installDate: new Date("2025-09-11"),
                serviceEndDate: daysFromNow(25),
                status: "Assigned"
            },
            {
                hospitalName: "Yashoda Hospitals",
                hospitalAddress: "Somajiguda, Hyderabad",
                hospitalContact: "9876543219",
                equipmentName: "ICU Defibrillator",
                equipmentType: "defibrillator",
                installDate: new Date("2025-10-14"),
                serviceEndDate: daysFromNow(15),
                status: "In Progress",
                handledBy: "Technician"
            }
        ]);

        console.log("Orders Seeded Successfully");

        process.exit();

    } catch (error) {
        console.log("Seed Error:", error);
        process.exit(1);
    }
}

seedOrders();
