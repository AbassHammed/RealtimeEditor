import React, { useEffect, useState } from "react";
import { authModalState } from "@/atoms/authModalAtom";
import Navbar from "@/components/Navbar/Navbar";
import AuthModal from "@/components/Modals/AuthModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Image from "next/image";

const AuthPage: React.FC = () => {
  const authModal = useRecoilValue(authModalState);
  const setAuthModalState = useSetRecoilState(authModalState);

  useEffect(() => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  }, [setAuthModalState]);

  return (
    <div className="bg-[#1A1A1A] h-screen relative">
      <div className="mx-auto">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <Image src="/hero.svg" alt="Hero image" width={700} height={700} />
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};
export default AuthPage;
