import client from "./client";

export const loginWithEmail = (email) => {
    return client.post("/api/auth/login", { email });
};
