import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your registered email");
            return;
        }

        setLoading(true);

        try {
            const res = await loginWithEmail(email.trim());
            const userData = res.data.user;

            login(userData);

            if (userData.role === "admin") {
                navigate("/admin");
            } else if (userData.role === "technician") {
                navigate("/technician");
            } else {
                setError("Access Denied");
            }

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Could not reach the server. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-side">
                <div className="login-side-mark">+</div>
                <h1>AffordMed</h1>
                <p>Medical Equipment Service Tracker</p>

                <ul className="login-side-points">
                    <li>Track installations across every partner hospital</li>
                    <li>Follow each service order from assigned to completed</li>
                    <li>Keep maintenance history in one place</li>
                </ul>
            </div>

            <div className="login-form-wrap">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Sign in</h2>
                    <p className="login-sub">Enter your registered email to continue</p>

                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@afford.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />

                    {error && <div className="login-error">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Checking..." : "Continue"}
                    </button>

                    <p className="login-hint">
                        Admin: admin@afford.com &nbsp;·&nbsp; Technician: technician@afford.com
                    </p>
                </form>
            </div>
        </div>
    );
}
