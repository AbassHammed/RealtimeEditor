import Collaborator from './Collaborative';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components';
import { TClients } from '@/types';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import Logo from '../../../public/Icon.png';
import { ImageTooltip } from '../Shared/ImageTooltip';

interface TopbarProps {
  clients?: TClients[];
}

const Topbar = ({ clients }: TopbarProps) => (
  <nav className="flex h-[50px] w-full items-center bg-[#0f0f0f] px-5">
    <div className="flex flex-grow items-center justify-start">
      <Link href="/">
        <Image src={Logo} alt="Logo image" height={50} width={50} />
      </Link>
    </div>

    <div className="flex flex-row items-center justify-center w-full">
      {clients && <ImageTooltip items={clients} />}
    </div>

    <div className="flex flex-grow items-center justify-end space-x-4">
      <Collaborator clients={clients} />
      <Link
        href="/auth"
        className={cn(buttonVariants({ variant: 'destructive' }), 'flex h-8 w-9 m-0 p-0')}>
        <LogOut className="h-4 w-4 text-white" />
      </Link>
    </div>
  </nav>
);
export default Topbar;
