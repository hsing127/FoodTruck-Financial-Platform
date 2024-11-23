import fetch from "node-fetch"; // For API requests
import atob from "atob"; // For decoding JWT payloads

interface CustomJwtPayload {
    email?: string;
    exp?: number;
}

interface ValidateTokenResponse {
    email: string;
}

interface ErrorResponse {
    error: string;
}

export const saveToken = (token: string, rememberMe: boolean): void => {
    if (rememberMe) {
        localStorage.setItem("jwt", token);
    } else {
        sessionStorage.setItem("jwt", token);
    }
};

export const getToken = (): string | null => {
    return localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
};

export const decodeToken = (): CustomJwtPayload | null => {
    const token = getToken();
    if (!token) return null;

    try {
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

export const isTokenExpired = (): boolean => {
    const decoded = decodeToken();
    if (!decoded || typeof decoded.exp === "undefined") return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
};

export const clearToken = (): void => {
    localStorage.removeItem("jwt");
    sessionStorage.removeItem("jwt");
};

export const validateToken = async (): Promise<{ email: string } | null> => {
    const token = getToken();
    if (!token) {
        console.error("No token found.");
        return null;
    }

    try {
        const response = await fetch(
            "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/auth/validateToken",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            const data = (await response.json()) as ValidateTokenResponse; // Explicit type assertion
            return { email: data.email };
        } else {
            const errorData = (await response.json()) as ErrorResponse; // Explicit type assertion
            console.error("Token validation error:", errorData.error);
            return null;
        }
    } catch (error) {
        console.error("Error validating token:", error);
        return null;
    }
};


export const requireTokenWrapper = async (
    getServerSidePropsFunction: Function
) => {
    return async (context: any) => {
        const token = getToken();

        if (!token) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }

        const validationResult = await validateToken();

        if (!validationResult || !validationResult.email) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }

        context.req.user = { email: validationResult.email };

        if (getServerSidePropsFunction) {
            return await getServerSidePropsFunction(context);
        }

        return { props: {} };
    };
};
