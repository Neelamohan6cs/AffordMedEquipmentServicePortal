import "./StatusTracker.css";

const STEPS = ["Assigned", "In Progress", "Completed"];

export default function StatusTracker({ status }) {
    const currentIndex = STEPS.indexOf(status);

    return (
        <div className="status-tracker">
            {STEPS.map((step, i) => (
                <div className="tracker-step" key={step}>
                    <div className="tracker-row">
                        <span className={`tracker-dot ${i <= currentIndex ? "done" : ""}`} />
                        {i < STEPS.length - 1 && (
                            <span className={`tracker-line ${i < currentIndex ? "done" : ""}`} />
                        )}
                    </div>
                    <span className={`tracker-label ${i <= currentIndex ? "done" : ""}`}>
                        {step}
                    </span>
                </div>
            ))}
        </div>
    );
}
