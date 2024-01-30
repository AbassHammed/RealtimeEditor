import { useState } from 'react';
import { useRouter } from 'next/router';
import Collaborator from './Collaborative';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Tooltip, Button } from '@nextui-org/react';
import { FiLogOut } from 'react-icons/fi';

type TClients = {
  socketId: string;
  collaboratorName: string;
};

type TopbarProps = {
  clients?: TClients[];
};

const TopLeftContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-items: center;
`;

const Topbar = ({ clients }: TopbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const onLeave = async () => {
    router.push(`/auth`);
  };

  return (
    <nav className="flex h-[50px] w-full shrink-0 items-center bg-[#0f0f0f] text-dark-gray-7">
      <div className="flex justify-between w-full px-5">
        <TopLeftContainer>
          <Link href="/" className="h-[22px]">
            <Image src="/Icon.png" alt="Logo" height={50} width={50} />
          </Link>
        </TopLeftContainer>

        <div className="flex items-center space-x-4 justify-end">
          <Collaborator
            clients={clients}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
          <Tooltip content="Logout" color="danger">
            <Button size="sm" color="danger" isIconOnly onClick={onLeave}>
              <FiLogOut />
            </Button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
