import React from "react";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@nextui-org/react";

const Navbar: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex flex-col items-center justify-center h-20 bg-[#1a1a1a] text-white relative">
      <div className="absolute top-4 left-4 flex items-center">
        <Image src="/Icon.png" alt="LetsCode Logo" width={50} height={50} />
        <h1 className="ml-2 font-['Irish_Grover',cursive]">LetsCode</h1>
      </div>
      <Button
        onClick={handleClick}
        className="absolute top-4 right-4 bg-gradient-to-tr from-[#610c9f] to-pink-500  text-white py-2.5 px-5 border-none rounded-md text-lg font-medium cursor-pointer shadow-lg"
      >
        Over here 🖐️
      </Button>
    </div>
  );
};
export default Navbar;
