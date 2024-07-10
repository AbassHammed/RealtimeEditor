import React from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms';

const Navbar: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState(prev => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex flex-col items-center justify-center h-20 bg-[#1a1a1a] text-white relative">
      <div className="absolute top-4 left-4 flex items-center">
        <Image src="/Icon.png" alt="LetsCode Logo" width={50} height={50} />
        <h1 className="ml-2 font-['Irish_Grover',cursive]">LetsCode</h1>
      </div>
      <button
        onClick={handleClick}
        className="px-4 py-2 rounded-md text-white text-center absolute top-4 right-4 overflow-hidden group/modal-btn flex justify-center bg-[#610c9f]">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          Create
        </span>
        <span className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
          Join
        </span>
      </button>
    </div>
  );
};
export default Navbar;
