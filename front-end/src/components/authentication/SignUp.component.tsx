'use client';

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';

export const SignUp = () => {
  const router = useRouter();
  const { signIn } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const signUp = async () => {
    if (!email || !password || !firstname || !lastname || !username) {
      setError('All fields are required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/auth/signup`,
        data: { email, password, firstname, lastname, username },
      });
      
      const { token, user } = response?.data || {};
      if (!token) {
        setError('Sign-up failed: No token received');
        return;
      }
      
      signIn(token, user);
      router.push('/dashboard');
    }
    catch (err: any) {
      const errorMsg = err?.response?.data?.message || 'An error occurred during sign-up';
      setError(errorMsg);
      console.error('Sign-up error:', err);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
        <div className="bg-white relative">
            <div className="w-screen h-screen relative z-1">
                <img src="/auth-background.jpg" alt="Logo" className="object-contain w-full h-full"/>
            </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center z-2 top-[35%] md:top-[25%] bottom-auto">
                    <div className="grid grid-cols-1 gap-2 md:gap-4">
                      <p className="text-center text-black text-lg md:text-4xl font-bold mb-4 md:mb-6 cursor-default">Note Me Up</p>
                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative w-40 md:w-80 text-sm mb-2">
                          {error}
                        </div>
                      )}
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="text-xl border border-black rounded-lg p-2 w-40 h-7 md:w-104 md:h-10 focus:outline-none focus:ring-1 focus:ring-black mb-2 md:mb-4" 
                        onChange={(e) => setEmail(e.target.value)} />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        className="text-xl border border-black rounded-lg p-2 w-40 h-7 md:w-104 md:h-10 focus:outline-none focus:ring-1 focus:ring-black mb-2 md:mb-4" 
                        onChange={(e) => setPassword(e.target.value)} />
                      <div className='flex flex-col md:flex-row gap-4'>
                        <input 
                          type="text" 
                          placeholder="First Name" 
                          className="text-xl border border-black rounded-lg p-2 w-40 h-7 md:w-50 md:h-10 focus:outline-none focus:ring-1 focus:ring-black mb-2 md:mb-4" 
                          onChange={(e) => setFirstname(e.target.value)} />
                        <input 
                          type="text" 
                          placeholder="Last Name" 
                          className="text-xl border border-black rounded-lg p-2 w-40 h-7 md:w-50 md:h-10 focus:outline-none focus:ring-1 focus:ring-black mb-4 md:mb-6" 
                          onChange={(e) => setLastname(e.target.value)} />
                        </div>
                      <input 
                        type="username" 
                        placeholder="User Name" 
                        className="text-xl border border-black rounded-lg p-2 w-40 h-7 md:w-104 md:h-10 focus:outline-none focus:ring-1 focus:ring-black mb-2 md:mb-4" 
                        onChange={(e) => setUsername(e.target.value)} />
                      <div className='flex flex-row gap-2'>
                        <button 
                          onClick={signUp} 
                          disabled={isLoading} 
                          className={`text-xl bg-black text-white rounded-lg p-2 w-full hover:bg-gray-800 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <button 
                          onClick={() => router.push('/')} 
                          className={`text-xl bg-black text-white rounded-lg p-2 w-full hover:bg-gray-800 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Back
                        </button>
                      </div>
                </div>
            </div>
        </div>
    </div>
  );
}