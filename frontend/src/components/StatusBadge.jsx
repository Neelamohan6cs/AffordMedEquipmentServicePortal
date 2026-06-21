import "./StatusBadge.css";

export default function StatusBadge({ status }) {
    const cssClass = "badge-" + status.toLowerCase().replace(" ", "-");

    return (
        <span className={`status-badge ${cssClass}`}>
            {status}
        </span>
    );
}
