interface CustomJwtPayload {
    email?: string; // Optional property for the user's email
    exp?: number;   // Optional property for expiration time
}

// Save the token in localStorage or sessionStorage
export const saveToken = (token: string, rememberMe: boolean): void => {
    if (rememberMe) {
        localStorage.setItem("jwt", token);
    } else {
        sessionStorage.setItem("jwt", token);
    }
};

// Retrieve the token from storage
export const getToken = (): string | null => {
    return localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
};

// Decode the token to extract user information
export const decodeToken = (): CustomJwtPayload | null => {
    const token = getToken();
    if (!token) return null;

    try {
        // Manually decode the token
        const base64Url = token.split(".")[1];
        if (!base64Url) throw new Error("Invalid token structure.");

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = atob(base64);
        const payload = JSON.parse(jsonPayload) as CustomJwtPayload;

        return payload;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

// Check if the token is expired
export const isTokenExpired = (): boolean => {
    const decoded = decodeToken();
    if (!decoded || typeof decoded.exp === "undefined") return true; // Treat missing `exp` as expired

    const now = Date.now() / 1000; // Current time in seconds
    return decoded.exp < now; // True if token has expired
};

// Clear the token from storage
export const clearToken = (): void => {
    localStorage.removeItem("jwt");
    sessionStorage.removeItem("jwt");
};

// Validate the token via the backend
export const validateToken = async (): Promise<CustomJwtPayload | null> => {
    const token = getToken();
    if (!token) {
        console.error("No token found.");
        return null;
    }

    try {
        const response = await fetch("https://your-api-gateway-url/validateToken", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.user as CustomJwtPayload; // Return user details
        } else {
            const errorData = await response.json();
            console.error("Token validation error:", errorData.error);
            return null;
        }
    } catch (error) {
        console.error("Error validating token:", error);
        return null;
    }
};

