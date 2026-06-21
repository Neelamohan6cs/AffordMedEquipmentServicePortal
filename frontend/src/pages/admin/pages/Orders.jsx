import { useState } from "react";
import { createOrder } from "../../../api/adminApi";

const emptyForm = {
    hospitalName: "",
    hospitalAddress: "",
    hospitalContact: "",
    equipmentName: "",
    equipmentType: "",
    installDate: "",
    serviceEndDate: ""
};

export default function Orders() {
    const [formData, setFormData] = useState(emptyForm);
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (
            !formData.hospitalName ||
            !formData.hospitalAddress ||
            !formData.hospitalContact ||
            !formData.equipmentName ||
            !formData.equipmentType ||
            !formData.installDate ||
            !formData.serviceEndDate
        ) {
            setMessage({ type: "error", text: "Please fill in every field before submitting." });
            return;
        }

        if (formData.serviceEndDate < formData.installDate) {
            setMessage({ type: "error", text: "Service due date cannot be before the install date." });
            return;
        }

        setSubmitting(true);

        try {
            await createOrder(formData);
            setMessage({ type: "success", text: "Service order created and assigned." });
            setFormData(emptyForm);
        } catch (error) {
            console.log(error);
            setMessage({ type: "error", text: "Something went wrong while saving this order." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1>New Service Order</h1>
                <p>Register a newly installed piece of equipment for tracking</p>
            </div>

            <div className="order-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="order-form-grid">
                        <div>
                            <label>Hospital Name</label>
                            <input
                                type="text"
                                name="hospitalName"
                                value={formData.hospitalName}
                                onChange={handleChange}
                                placeholder="Apollo Hospital"
                            />
                        </div>

                        <div>
                            <label>Hospital Contact</label>
                            <input
                                type="text"
                                name="hospitalContact"
                                value={formData.hospitalContact}
                                onChange={handleChange}
                                placeholder="10-digit phone number"
                            />
                        </div>

                        <div className="full-width">
                            <label>Hospital Address</label>
                            <input
                                type="text"
                                name="hospitalAddress"
                                value={formData.hospitalAddress}
                                onChange={handleChange}
                                placeholder="Street, City"
                            />
                        </div>

                        <div>
                            <label>Equipment Name</label>
                            <input
                                type="text"
                                name="equipmentName"
                                value={formData.equipmentName}
                                onChange={handleChange}
                                placeholder="ICU Ventilator"
                            />
                        </div>

                        <div>
                            <label>Equipment Type</label>
                            <select name="equipmentType" value={formData.equipmentType} onChange={handleChange}>
                                <option value="">Select type</option>
                                <option value="ventilator">Ventilator</option>
                                <option value="monitor">Monitor</option>
                                <option value="defibrillator">Defibrillator</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label>Install Date</label>
                            <input
                                type="date"
                                name="installDate"
                                value={formData.installDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Service Due Date</label>
                            <input
                                type="date"
                                name="serviceEndDate"
                                value={formData.serviceEndDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="btn-primary" type="submit" disabled={submitting}>
                            {submitting ? "Saving..." : "Create Service Order"}
                        </button>
                        {message && (
                            <span className={`form-msg ${message.type}`}>{message.text}</span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
