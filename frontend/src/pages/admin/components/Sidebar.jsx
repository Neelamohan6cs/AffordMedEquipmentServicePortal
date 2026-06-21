import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <div className="sidebar-logo">
                    <span className="sidebar-logo-mark">+</span>
                    AffordMed
                </div>
                <div className="sidebar-role">Admin Console</div>
            </div>

            <nav className="sidebar-nav">
                <Link to="/admin" className={isActive("/admin") ? "active" : ""}>
                    Dashboard
                </Link>
                <Link to="/admin/orders" className={isActive("/admin/orders") ? "active" : ""}>
                    New Service Order
                </Link>
                <Link to="/admin/orders-list" className={isActive("/admin/orders-list") ? "active" : ""}>
                    All Service Orders
                </Link>
            </nav>

            <div className="sidebar-bottom">
                <div className="sidebar-user">
                    <div className="sidebar-avatar">{user?.name?.charAt(0) || "A"}</div>
                    <div>
                        <div className="sidebar-user-name">{user?.name}</div>
                        <div className="sidebar-user-email">{user?.email}</div>
                    </div>
                </div>
                <button className="sidebar-logout" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </div>
    );
}
