"use client"

import { AuthContextType } from "@/types/Auth";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]') as { username: string, password: string }[];

const getInitialUser = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('loggedInUser');
    }
    return null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(getInitialUser);

    const encodePassword = (password: string): string => btoa(password);

    const register = useCallback((username: string, password: string): boolean => {
        const users = getUsers();
        
        if (users.find(u => u.username === username)) {
            alert("Registration failed: Username already exists");
            return false;
        }

        const encodedPassword = encodePassword(password);
        
        users.push({ username, password: encodedPassword });
        localStorage.setItem('users', JSON.stringify(users));
        
        alert("Registration successful! You can now log in");
        return true;
    }, []);

    const login = useCallback((username: string, password: string): boolean => {
        const users = getUsers();
        const encodedInputPassword = encodePassword(password);

        const foundUser = users.find(
            u => u.username === username && u.password === encodedInputPassword
        );

        if (foundUser) {
            localStorage.setItem('loggedInUser', username);
            setUser(username); // Update React Context state
            alert("Login successful!");
            return true;
        } else {
            alert("Login failed: Invalid username or password");
            return false;
        }
    }, []);

    const contextValue: AuthContextType = {
        user,
        isLoggedIn: !!user,
        login,
        register,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};