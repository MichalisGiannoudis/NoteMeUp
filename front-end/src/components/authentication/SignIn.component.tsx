'use client';

import { useAuth } from "@/hooks/auth/useAuth.hook";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export const SignIn = () => {
  const router = useRouter();
  const { user, authenticated, isLoading, error, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && (user || authenticated)) {
      router.push('/dashboard');
    }
  }, [user, authenticated, router, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-t-2 border-b-2 border-black rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSignIn = async () => {
    setLocalError(null);
    
    if (!email) {
      setLocalError('Email is required');
      return;
    }
    if (!password) {
      setLocalError('Password is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await signIn(email, password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setLocalError(result.error || 'Sign-in failed. Please check your credentials.');
      }
    } catch (err) {
      setLocalError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white relative">
      <div className="w-screen h-screen relative z-1">
        <Image src="/auth-background.jpg" alt="Logo" fill className="object-contain"/>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center z-2 top-[35%] md:top-[25%] bottom-auto">
        <div className="grid grid-cols-1 gap-2 md:gap-4">
          <p className="text-center text-black text-lg md:text-4xl font-bold mb-4 md:mb-6 cursor-default">Note Me Up</p>
          <div className="flex flex-col gap-4">
            {(error || localError) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative w-40 md:w-80 text-sm">
                {localError || error}
              </div>
            )}
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xl border border-black rounded-lg p-2 w-40 h-7 md:w-80 md:h-10 focus:outline-none focus:ring-1 focus:ring-black"/>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-xl border border-black rounded-lg p-2 w-40 h-7 md:w-80 md:h-10 focus:outline-none focus:ring-1 focus:ring-black"/>
            <button 
              onClick={handleSignIn} 
              disabled={isSubmitting} 
              className="text-xl bg-black text-white rounded-lg p-2 w-40 md:w-80 hover:bg-gray-800 transition duration-200 mt-4 md:mt-6"> 
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="flex items-center">
              <div className="flex-grow h-px bg-black" />
              <span className="mx-2 text-black text-lg"> or</span>
              <div className="flex-grow h-px bg-black" />
            </div>
            <button 
              onClick={() => {router.push('/signup')}} 
              className="text-xl bg-black text-white rounded-lg p-2 w-40 md:w-80 hover:bg-gray-800 transition duration-200"> 
              Sign Up
            </button>
          </div>
        </div>
      </div>
  </div>
  )
}