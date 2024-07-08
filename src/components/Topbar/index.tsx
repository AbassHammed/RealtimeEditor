import { useState } from 'react';
import { useRouter } from 'next/router';
import Collaborator from './Collaborative';
import Link from 'next/link';
import Image from 'next/image';
import { Tooltip, Button } from '@nextui-org/react';
import { FiLogOut } from 'react-icons/fi';
import AvatarDiv from './AvatarDiv';

type TClients = {
  socketId: string;
  collaboratorName: string;
};

type TopbarProps = {
  clients?: TClients[];
};

const Topbar = ({ clients }: TopbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const onLeave = async () => {
    router.push(`/auth`);
  };

  return (
    <nav className="flex h-[50px] w-full items-center bg-[#0f0f0f] px-5">
      <div className="flex flex-grow items-center justify-start">
        <Link href="/">
          <Image src="/Icon.png" alt="Logo" height={50} width={50} />
        </Link>
      </div>

      <div className="flex flex-grow items-center justify-center">
        <AvatarDiv clients={clients} />
      </div>

      <div className="flex flex-grow items-center justify-end space-x-4">
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
    </nav>
  );
};
export default Topbar;
