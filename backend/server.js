const express=require("express");
const app =express();
const cors = require("cors");

const dotenv=require("dotenv");

dotenv.config();
app.use(express.json());


const connectDb=require("./config/db")
connectDb();

app.use(cors({
   origin: [
    "http://localhost:5173",
    "https://affordmedservice.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const adminRoutes=require("./routes/admin");
app.use("/api/admin" , adminRoutes);

const authRoutes=require("./routes/auth");
app.use("/api/auth" , authRoutes);

const technicianRoutes=require("./routes/technician");
app.use("/api/technician" , technicianRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(5000,()=>{
    console.log("server");
})