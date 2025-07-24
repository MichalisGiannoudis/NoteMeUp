'use client';

import { useRequireAuth } from "@/hooks/useRequireAuth.hook";
import { useUpdateUser } from "@/hooks/user/useUpdateUser.hook";
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const UserComponent = () => {
    const router = useRouter();
    const { user, authenticated, isLoading } = useRequireAuth() as { user: User | null, authenticated: boolean, isLoading: boolean };
    const { updateUser, isLoading: isUpdating, error, success } = useUpdateUser();
    const { setTheme } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<User>>({
        firstname: '',
        lastname: '',
        username: '',
        telephone: '',
        address: '',
        theme: 'light'
    });
    
    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                telephone: user.telephone || '',
                address: user.address || '',
                theme: user.theme || 'light'
            });
        }
    }, [user]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await updateUser(formData);
        if (result) {
            if (result.theme && result.theme !== user?.theme) {
                setTheme(result.theme as 'light' | 'dark');
            }
            setIsEditing(false);
        }
    };
    
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
        <div className="p-8 bg-background min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-blue-600 p-8 text-white">
                            <Image src='/back-icon.png' onClick={() => router.push('/dashboard')} alt="BackButton" className="mb-4" width={30} height={30}/>
                        <div className="mb-6">
                            <div className="w-40 h-40 rounded-ful mx-auto flex items-center justify-center text-4xl font-bold">
                                <Image src={`${user.profilePicture || '/dashboard/user-icon.png'}`} alt="UserIcon" width={100} height={100} className="rounded-full" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">{user.firstname} {user.lastname}</h3>
                            <p className="opacity-80">{user.email}</p>
                        </div>
                        <div className="mt-8">
                            <button onClick={() => setIsEditing(!isEditing)} className="w-full py-2 px-4 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium mb-3">
                                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                    
                    <div className="md:w-2/3 p-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            {isEditing ? 'Edit Your Information' : 'User Information'}
                        </h1>
                        
                        {success && (
                            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                Profile updated successfully!
                            </div>
                        )}
                        
                        {error && (
                            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}
                        
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required/>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required/>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                        <input type="text" name="userName" value={formData.username} onChange={handleInputChange} 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required/>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
                                        <input type="tel" name="telephone" value={formData.telephone ?? ''} onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"/>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"/>
                                    </div>
                                
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isUpdating}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                                        {isUpdating ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </span>
                                        ) : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                                        <p className="mt-1 text-md ">{user.firstname}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                                        <p className="mt-1 text-md ">{user.lastname}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Username</h3>
                                        <p className="mt-1 text-md ">{user.username}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Telephone</h3>
                                        <p className="mt-1 text-md ">{user.telephone || 'Not provided'}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                                        <p className="mt-1 text-md ">{user.address || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}