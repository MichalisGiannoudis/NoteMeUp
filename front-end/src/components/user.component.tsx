'use client';

import { useRequireAuth } from "@/hooks/useRequireAuth.hook";
import { User } from "@/types/user";

export const UserComponent = () => {
    const { user, authenticated, isLoading } = useRequireAuth() as { user: User | null, authenticated: boolean, isLoading: boolean };
    
    if (isLoading) {
        return (
        <div className="p-16 bg-background h-screen">
            <div className="text-2xl mb-4 font-bold text-foreground">User Profile</div>
            <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-blue-600" />
            <div className="mt-4 text-foreground">Loading user data...</div>
        </div>
        );
    }
    
    if (!authenticated || !user) {
        return null;
    }
    
    return (
        <div className="p-16 bg-background h-screen">
        <h1 className="text-2xl font-bold text-foreground mb-4">User Profile</h1>
        <div className="text-lg text-foreground mb-2">First Name: {user.firstname}</div>
        <div className="text-lg text-foreground mb-2">Last Name: {user.lastname}</div>
        <div className="text-lg text-foreground mb-2">Email: {user.email}</div>
        <div className="text-lg text-foreground mb-2">UserName: {user.userName}</div>
        <div className="text-lg text-foreground mb-2">Telephone: {user.telephone || 'N/A'}</div>
        <div className="text-lg text-foreground mb-2">Address: {user.address || 'N/A'}</div>
        </div>
    );
}