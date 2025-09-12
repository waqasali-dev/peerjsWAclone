import React, { createContext, useState } from "react";

export const AuthContext = createContext<{
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}>({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const login = (username: string) => setUser(username);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}