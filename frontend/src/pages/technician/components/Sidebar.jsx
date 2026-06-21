import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

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
        <div className="tech-sidebar">
            <div className="tech-sidebar-top">
                <div className="tech-sidebar-logo">
                    <span className="tech-sidebar-logo-mark">+</span>
                    AffordMed
                </div>
                <div className="tech-sidebar-role">Technician</div>
            </div>

            <nav className="tech-sidebar-nav">
                <Link to="/technician" className={isActive("/technician") ? "active" : ""}>
                    Dashboard
                </Link>
                <Link to="/technician/orders" className={isActive("/technician/orders") ? "active" : ""}>
                    Service Orders
                </Link>
            </nav>



            <div className="tech-sidebar-bottom">
                                <div className="tech-sidebar-user">
                                    <div className="tech-sidebar-avatar">
                                        {user?.name?.charAt(0) || "T"}
                                    </div>

                                    <div>
                                        <div className="tech-sidebar-user-name">
                                            {user?.name}
                                        </div>

                                        <div className="tech-sidebar-user-email">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>

                               

                                <button
                                    className="tech-sidebar-logout"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </button>
                            </div>



        </div>
    );
}
