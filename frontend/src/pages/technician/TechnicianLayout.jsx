import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./Technician.css";

export default function TechnicianLayout() {
    return (
        <div className="tech-layout">
            <Sidebar />
            <div className="tech-content">
                <Outlet />
            </div>
        </div>
    );
}
