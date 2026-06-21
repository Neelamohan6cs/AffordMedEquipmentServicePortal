import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./Admin.css";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}
