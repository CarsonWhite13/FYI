
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left section (hero/branding) */}
      <div className="w-full md:w-1/2 bg-primary flex flex-col justify-center items-center p-8 text-white animate-fade-in">
        <div className="max-w-md text-center md:text-left">
          <div className="mb-6 flex items-center justify-center md:justify-start">
            <div className="bg-white h-12 w-12 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">F</span>
            </div>
            <h1 className="ml-3 text-2xl font-bold">Foster Young Insights</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Consultant Management Dashboard</h2>
          <p className="text-lg opacity-90 mb-8">
            Connect consultants with clients, manage work orders, and track progress all in one place.
          </p>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <p>Role-based access for consultants and admins</p>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h10M12 2v20M22 12h-10M12 22V2"></path></svg>
              </div>
              <p>Seamless work order management</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
              <p>Real-time project updates and notifications</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right section (auth form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-background">
        <AuthForm />
      </div>
    </div>
  );
};

export default Index;
