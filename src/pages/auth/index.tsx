import React from 'react';
import { Navbar } from '@/components';
import Image from 'next/image';

const AuthPage: React.FC = () => (
  <div className="bg-[#1A1A1A] h-screen relative">
    <div className="mx-auto">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
        <Image src="/hero.svg" alt="Hero image" width={700} height={700} />
      </div>
    </div>
  </div>
);
export default AuthPage;
