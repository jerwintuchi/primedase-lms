import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import MainNav from './mainnav';

const LandingPage = () => {
    return (
        <div>
            {/* Navbar */}
            <MainNav/>
            {/* Landing Page Content */}
            <div className="bg-yellow-300 h-[calc(100vh-72px)] text-purple-700 bg-full flex flex-col justify-center items-center">
                <img src="primedase.svg" alt="Logo" className="h-auto w-auto mb-4"/>
                <h1 className="text-4xl">Welcome to Our Website!</h1>
        </div>
        </div>
    );
}

export default LandingPage;